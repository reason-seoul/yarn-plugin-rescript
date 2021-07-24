import { Command, UsageError } from 'clipanion';
import {
  Configuration,
  Project,
  structUtils,
  MessageName,
} from '@yarnpkg/core';
import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';

import Report, { applyHyperlink } from '../Report';

export default class InitCommand extends BaseCommand {
  static usage = Command.Usage({
    description: 'Initialize ReScript for the current workspace',
    details : `
      Initialize ReScript for the current workspace.
      It will automatically install 'rescript' package, and generate \`bsconfig.json\`.
      It will also install React and genType as you specify.
    `,
    examples: [
      [
        'Install rescript, generate bsconfig.json',
        'yarn res init',
      ],
      [
        'Install rescript, generate bsconfig.json, prefer ES Modules output',
        'yarn res init --module=es6',
      ],
      [
        'Install rescript and @rescript/react, generate bsconfig.json with jsx setting',
        'yarn res init --with-react',
      ],
      [
        'Install rescript and gentype, generate bsconfig.json with gentype setting',
        'yarn res init --with-gentype',
      ],
      [
        'Install rescript and gentype, generate bsconfig.json with gentype (TypeScript) setting',
        'yarn res init --with-gentype=typescript',
      ],
      [
        'Install rescript as devDependencies, install external stdlib (default is @rescript/std) and generate bsconfig.json',
        'yarn res init --with-external-std',
      ],
    ],
  });

  @Command.Boolean('--json', {
    description: 'Format the output as an NDJSON stream',
  })
  json = false;

  @Command.String('--module', {
    description: 'Specify module type in ReScript complier output, can be one of "commonjs", "es6", or "es6-global" (default: "commonjs")',
  })
  moduleType = 'commonjs';

  @Command.Boolean('--with-react', {
    description: 'Enable ReScript React and JSX syntax',
  })
  withReact = false;

  @Command.String('--with-gentype', {
    description: 'Enable genType, can be one of "typescript", "flow", or "untyped" (default: "untyped")',
    tolerateBoolean: true,
  })
  withGentype: string | boolean = false;

  @Command.String('--with-external-std', {
    description: 'Use external std library, and install ReScript as dev-only dependency',
    tolerateBoolean: true,
  })
  externalStd: string | boolean = false;

  @Command.Path('res', 'init')
  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
    }

    if (!this.validateModuleType(this.moduleType)) {
      throw new UsageError('Value of --module must be "commonjs", "es6", or "es6-global"');
    }

    if (this.withGentype !== true && !this.validateGenType(this.withGentype || 'untyped')) {
      throw new UsageError('Value of --use-gentype must be "typescript", "flow", or "untyped"');
    }

    const resIdent = structUtils.parseIdent('rescript');
    const resDescriptor = workspace.dependencies.get(resIdent.identHash);
    if (!resDescriptor) {
      const installRescript = await Report.start({
        configuration,
        stdout: this.context.stdout,
        json: this.json,
      }, async report => {
        report.reportInfo(MessageName.UNNAMED, 'Installing latest version of "rescript"');
        try {
          await this.tryCli([
            'add',
            this.externalStd && '--dev',
            'rescript',
          ].filter(Boolean));
        } catch (error) {
          report.reportError(MessageName.EXCEPTION, error.message);
          return;
        }

        if (this.withReact) {
          report.reportSeparator();
          report.reportInfo(MessageName.UNNAMED, 'Installing latest version of "@rescript/react"');
          try {
            await this.tryCli(['add', 'react', 'react-dom', '@rescript/react']);
          } catch (error) {
            report.reportError(MessageName.EXCEPTION, error.message);
            return;
          }
        }

        if (this.externalStd) {
          const externalStd = this.externalStd === true ? '@rescript/std' : this.externalStd;

          report.reportSeparator();
          report.reportInfo(MessageName.UNNAMED, `Installing latest version of "${externalStd}"`);
          try {
            await this.tryCli(['add', externalStd]);
          } catch (error) {
            report.reportError(MessageName.EXCEPTION, error.message);
            return;
          }
        }
      });
      if (installRescript.hasErrors()) {
        return installRescript.exitCode();
      }

      const gentypeIdent = structUtils.parseIdent('gentype');
      const gentypeDescriptor = workspace.dependencies.get(gentypeIdent.identHash);
      if (this.withGentype && !gentypeDescriptor) {
        const installGentype = await Report.start({
          configuration,
          stdout: this.context.stdout,
          json: this.json,
        }, async report => {
          report.reportInfo(MessageName.UNNAMED, 'Installing latest version of "gentype"');
          try {
            await this.tryCli(['add', '--dev', 'gentype']);
          } catch (error) {
            report.reportError(MessageName.EXCEPTION, error.message);
          }
        });
        if (installGentype.hasErrors()) {
          return installGentype.exitCode();
        }
      }
    }

    const defaultFs = new NodeFS();

    const bsConfigPath = ppath.join(workspace.cwd, 'bsconfig.json' as Filename);
    const bsConfigExist = await defaultFs.existsPromise(bsConfigPath);
    if (!bsConfigExist) {
      const initConfig = await Report.start({
        configuration,
        stdout: this.context.stdout,
        json: this.json,
      }, async report => {
        const config = this.renderConfigFile({
          reactJsx: this.withReact,
          workspaceName: structUtils.stringifyIdent(workspace.manifest.name),
          moduleType: this.moduleType as 'commonjs' | 'es6' | 'es6-global',
          externalStd: this.externalStd,
          gentype: this.withGentype as 'typescript' | 'flow' | 'untyped' | boolean,
        });

        await defaultFs.writeFilePromise(bsConfigPath, config);
        report.reportInfo(MessageName.UNNAMED, `Config file generated at ${applyHyperlink(configuration, 'bsconfig.json', bsConfigPath)}`);
      });
      if (initConfig.hasErrors()) {
        return initConfig.exitCode();
      }
    }

    try {
      await defaultFs.mkdirpPromise(ppath.join(workspace.cwd, 'src' as Filename));
    } catch { /* drop error */}

    await this.tryCli(['res', 'link']);

    return this.cli.run(['rescript', 'build', '-with-deps'], this.context);
  }

  async tryCli(input: string[]) {
    const exitCode = await this.cli.run(input, this.context);
    if (exitCode !== 0) {
      throw new Error(`"yarn ${input.join(' ')}" command has been failed`);
    }
  }

  validateModuleType(moduleType: string): moduleType is 'es6' | 'es6-global' | 'commonjs' {
    return ['es6', 'es6-global', 'commonjs'].includes(moduleType);
  }

  validateGenType(gentype: string): gentype is 'typescript' | 'flow' | 'untyped' {
    return ['typescript', 'flow', 'untyped'].includes(gentype);
  }

  renderConfigFile({
    reactJsx,
    workspaceName,
    moduleType,
    externalStd,
    gentype,
  }: {
    workspaceName: string,
    reactJsx: boolean,
    moduleType: 'es6' | 'es6-global' | 'commonjs',
    externalStd: string | boolean,
    gentype: 'typescript' | 'flow' | 'untyped' | boolean,
  }) {
    return JSON.stringify({
      'name': workspaceName,
      ...reactJsx && {
        'reason': {
          'react-jsx': 3,
        },
      },
      'refmt': 3,
      'suffix': '.bs.js',
      'sources': [
        {
          'dir': 'src',
          'subdirs': true,
        },
      ],
      'bsc-flags': [
        '-bs-super-errors',
        '-bs-no-version-header',
      ],
      'package-specs': [
        {
          'module': moduleType,
          'in-source': true,
        },
      ],
      ...externalStd && {
        'external-std': externalStd === true ? '@rescript/std' : externalStd,
      },
      'bs-dependencies': [
        reactJsx && '@rescript/react',
      ].filter(Boolean),
      'bs-dev-dependencies': [
      ],
      ...gentype && {
        'gentypeconfig':{
          'language': gentype === true ? 'untyped' : gentype,
          'generatedFileExtension':
            (reactJsx && gentype === 'typescript') ? '.gen.tsx' :
            (gentype === 'typescript') ? '.gen.ts' :
            '.gen.js',
        }
      },
    }, null, 2);
  }
}
