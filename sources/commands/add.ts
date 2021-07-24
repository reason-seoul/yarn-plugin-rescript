import { Command } from 'clipanion';
import {
  Configuration,
  Project,
  MessageName,
  LightReport,
} from '@yarnpkg/core';
import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';

export default class AddCommand extends BaseCommand {
  static usage = Command.Usage({
    description: 'Install dependencies',
    details: 'Install dependencies, add them to both package.json and bsconfig.json',
  });

  @Command.Boolean('-D, --dev', {
    description: 'Install packages as devDependencies',
  })
  dev = false;

  @Command.Rest()
  packages: string[] = [];

  @Command.Path('res', 'add')
  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
    }

    const installation = await LightReport.start({
      configuration,
      stdout: this.context.stdout,
    }, async report => {
      const exitCode = await this.cli.run([
        'add',
        this.dev && '--dev',
        ...this.packages,
      ].filter(Boolean), this.context);
      if (exitCode !== 0) {
        report.reportErrorOnce(MessageName.EXCEPTION, 'Failed to install packages');
      }
    });

    if (installation.hasErrors()) {
      return installation.exitCode();
    }

    const defaultFs = new NodeFS();

    const bsConfigPath = ppath.join(workspace.cwd, 'bsconfig.json' as Filename);
    const bsConfig = await defaultFs.readFilePromise(bsConfigPath, 'utf8').then(JSON.parse);
    const target = this.dev ? 'bs-dev-dependencies' : 'bs-dependencies';
    bsConfig[target] = [
      ...(bsConfig[target] || []),
      ...this.packages,
    ];

    await defaultFs.writeFilePromise(bsConfigPath, JSON.stringify(bsConfig, null, 2));

    return this.cli.run(['res', 'link'], this.context);
  }
}
