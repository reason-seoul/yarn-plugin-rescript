import { Command } from 'clipanion';
import type { Package } from '@yarnpkg/core';
import {
  Cache,
  Configuration,
  Project,
  StreamReport,
  structUtils,
} from '@yarnpkg/core';
import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli';
import type { FakeFS, PortablePath } from '@yarnpkg/fslib';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';
import { pnpUtils } from '@yarnpkg/plugin-pnp';

export default class SetupCommand extends BaseCommand {
  static usage = Command.Usage({
    description: 'Setup rescript dependencies',
  });

  realFs = new NodeFS();

  @Command.Boolean('Format the output as an NDJSON stream')
  json: boolean;

  @Command.Path('res', 'setup')
  async execute() {
    let exitCode = 0;

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
    }

    await project.restoreInstallState();

    const resConfigPath = ppath.join(workspace.cwd, 'bsconfig.json' as Filename);
    const resConfigExist = await this.realFs.existsPromise(resConfigPath);
    if (!resConfigExist) {
      console.log('TODO: res init first');
      return 1;
    }

    const topLevelPkg = project.storedPackages.get(project.topLevelWorkspace.anchoredLocator.locatorHash);

    const resConfig = await this.realFs.readFilePromise(resConfigPath, 'utf8').then(JSON.parse);
    const resDependencies = resConfig['bs-dependencies'] || [];
    const resDevDependencies = resConfig['bs-dev-dependencies'] || [];
    const resPpxDependencies= (resConfig['ppx-flags'] || [])
      .map((ppx: any) => Array.isArray(ppx) ?  ppx[0] : ppx)
      .map((ppx: string) =>
        ppx.split('/').slice(0, -1).slice(0, 2).join('/')
      );

    const getRescriptPackages = (pkgNames: string[]) => {
      const selection: Array<Package> = [];

      for (const pkgName of pkgNames) {
        const ident = structUtils.parseIdent(pkgName);
        const descriptor = topLevelPkg.dependencies.get(ident.identHash);
        const resolution = project.storedResolutions.get(descriptor.descriptorHash);
        if (!resolution) {
          throw new Error('Assertion failed: The resolution should have been registered');
        }
        const pkg = project.storedPackages.get(resolution);
        if (!pkg) {
          throw new Error('Assertion failed: The package should have been registered');
        }

        selection.push(pkg);
      }

      return selection;
    };

    const resPkgs = getRescriptPackages([
      'rescript',
      ...resDependencies,
      ...resDevDependencies,
      ...resPpxDependencies,
    ]);

    const unplug = await StreamReport.start({
      configuration,
      stdout: this.context.stdout,
      json: this.json,
    }, async report => {
      let shouldUnplug = false;
      for (const pkg of resPkgs) {
        const { version } = pkg;
        const dependencyMeta = project.topLevelWorkspace.manifest.ensureDependencyMeta(
          structUtils.makeDescriptor(pkg, version),
        );
        if (!dependencyMeta.unplugged) {
          dependencyMeta.unplugged = true;
          shouldUnplug = true;
        }
      }
      if (shouldUnplug) {
        await project.topLevelWorkspace.persistManifest();
        report.reportSeparator();
        await project.linkEverything({ cache, report });
      }
    });

    exitCode = unplug.exitCode();
    if (exitCode !== 0) {
      return exitCode;
    }

    const nodeModules = ppath.join(project.cwd, Filename.nodeModules);
    for (const pkg of resPkgs) {
      const unpluggedPath = pnpUtils.getUnpluggedPath(pkg, { configuration });

      const pkgName = structUtils.stringifyIdent(pkg);

      const targetPath = ppath.join(unpluggedPath, Filename.nodeModules, pkgName as Filename);
      const destPath = ppath.join(nodeModules, pkgName as Filename);

      await this.realFs.mkdirpPromise(ppath.dirname(destPath));
      await this.linkPath(this.realFs, targetPath, destPath);
    }

    return exitCode;
  }

  async linkPath(fs: FakeFS<any>, target: PortablePath, dest: PortablePath) {
    try {
      await fs.symlinkPromise(target, dest);
    } catch (err) {
      if (err?.code === 'EEXIST') {
        await fs.unlinkPromise(dest);
        await this.linkPath(fs, target, dest);
      } else {
        throw err;
      }
    }
  }
}
