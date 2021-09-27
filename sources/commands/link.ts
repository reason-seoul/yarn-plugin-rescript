import { Option } from 'clipanion';
import type { Workspace, Package, LocatorHash } from '@yarnpkg/core';
import {
  Cache,
  Configuration,
  Project,
  ThrowReport,
  StreamReport,
  structUtils,
} from '@yarnpkg/core';
import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli';
import type { FakeFS, PortablePath } from '@yarnpkg/fslib';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';
import { pnpUtils } from '@yarnpkg/plugin-pnp';

export default class LinkCommand extends BaseCommand {
  static paths = [['res', 'link']];
  static usage = {
    description: 'Link ReScript dependencies',
  };

  defaultFs = new NodeFS();

  json = Option.Boolean('--json', false, {
    description: 'Format the output as an NDJSON stream',
  });

  async execute(): Promise<number> {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
    }

    await project.restoreInstallState();

    const loadDependencyInfo = async (resConfigPath: PortablePath) => {
      const resConfigExist = await this.defaultFs.existsPromise(resConfigPath);
      if (!resConfigExist) {
        return null;
      }

      const resConfig = await this.defaultFs.readFilePromise(resConfigPath, 'utf8').then(JSON.parse);
      const resDependencies = (resConfig['bs-dependencies'] || []) as string[];
      const resDevDependencies = (resConfig['bs-dev-dependencies'] || []) as string[];
      const resPpxDependencies = (resConfig['ppx-flags'] || [])
        .map((flag: string | string[]) => Array.isArray(flag) ? flag[0] : flag)
        .map((ppx: string) => ppx.match(/^@[^\/]+\/[^\/]+|^[^\/]+/)?.[0])
        .filter(Boolean) as string[];

      const hasGentype = resConfig['gentypeconfig'] != null;

      return { resDependencies, resDevDependencies, resPpxDependencies, hasGentype };
    }

    const resConfigPaths = [workspace.cwd, ...workspace.workspacesCwds.values()]
    const resDependencyInfos = await Promise.all(
      resConfigPaths.map(async workspaceCwd => ({
        workspaceCwd,
        info: await loadDependencyInfo(ppath.join(workspaceCwd, 'bsconfig.json' as Filename))
      }))
    ).then(arr => arr.filter(v => v.info != null));

    if (resDependencyInfos.length === 0) {
      console.log('TODO: res init first');
      return 1;
    }

    const { packages, packageWorkspaces } = await Promise.all(
      resDependencyInfos.map(async ({
        workspaceCwd,
        info: { resDependencies, resDevDependencies, resPpxDependencies, hasGentype },
      }) => {
        const { project, workspace } = await Project.find(configuration, workspaceCwd);

        await project.restoreInstallState();

        return this.getRescriptPackages([
          'rescript',
          ...(hasGentype ? ['gentype'] : []),
          ...resDependencies,
          ...resDevDependencies,
          ...resPpxDependencies,
        ].filter(Boolean), {
          workspace,
          project,
          cache,
          configuration,
        });
      })
    ).then(packagesArr => packagesArr.reduce(
      (acc, packages) => {
        acc.packages.push(...packages.packages);
        acc.packageWorkspaces.push(...packages.packageWorkspaces);
        return acc;
      },
      { packages: [], packageWorkspaces: [] }
    ));

    const unplug = await StreamReport.start({
      configuration,
      stdout: this.context.stdout,
      json: this.json,
    }, async report => {
      let shouldLink = false;
      for (const pkg of packages) {
        const { version } = pkg;
        const dependencyMeta = project.topLevelWorkspace.manifest.ensureDependencyMeta(
          structUtils.makeDescriptor(pkg, version),
        );
        if (!dependencyMeta.unplugged) {
          dependencyMeta.unplugged = true;
          shouldLink = true;
        }
      }
      if (shouldLink) {
        await project.topLevelWorkspace.persistManifest();
        report.reportSeparator();
        await project.linkEverything({ cache, report });
      }
    });

    if (unplug.hasErrors()) {
      return unplug.exitCode();
    }

    const nodeModules = ppath.join(project.cwd, Filename.nodeModules);
    for (const pkg of packages) {
      const unpluggedPath = pnpUtils.getUnpluggedPath(pkg, { configuration });

      const pkgName = structUtils.stringifyIdent(pkg);

      const targetPath = ppath.join(unpluggedPath, Filename.nodeModules, pkgName as Filename);
      const destPath = ppath.join(nodeModules, pkgName as Filename);

      await this.defaultFs.mkdirpPromise(ppath.dirname(destPath));
      await this.linkPath(this.defaultFs, targetPath, destPath);
    }
    for (const workspace of packageWorkspaces) {
      const pkgName = structUtils.stringifyIdent(workspace.locator);

      const targetPath = workspace.cwd;
      const destPath = ppath.join(nodeModules, pkgName as Filename);

      await this.defaultFs.mkdirpPromise(ppath.dirname(destPath));
      await this.linkPath(this.defaultFs, targetPath, destPath);
    }

    return 0;
  }

  async getRescriptPackages(packageNames: string[], {
    workspace,
    project,
    configuration,
    cache,
  }: {
    workspace: Workspace,
    project: Project,
    configuration: Configuration,
    cache?: Cache,
  }) {
    const seen: Set<LocatorHash> = new Set();
    const packages: Array<Package> = [];
    const packageWorkspaces: Array<Workspace> = [];

    const fetcher = configuration.makeFetcher();

    const traverse = async (pkg: Package) => {
      if (seen.has(pkg.locatorHash)) {
        return;
      }
      seen.add(pkg.locatorHash);

      let pkgWorkspace: Workspace | null;
      if (pkgWorkspace = project.tryWorkspaceByLocator(pkg)) {
        packageWorkspaces.push(pkgWorkspace);
      } else {
        packages.push(pkg);
      }

      const report = new ThrowReport();
      const result = await fetcher.fetch(pkg, {
        project,
        fetcher,
        cache,
        report,
        checksums: project.storedChecksums,
      });
      try {
        const resConfig = await result.packageFs
          .readFilePromise(ppath.join(result.prefixPath, 'bsconfig.json' as Filename), 'utf8')
          .then(JSON.parse)
          // gentype doesn't have bsconfig.json
          .catch(() => {}) || {};

        const resDependencies = (resConfig['bs-dependencies'] || []) as string[];

        for (const pkgName of resDependencies) {
          const ident = structUtils.parseIdent(pkgName);
          const descriptor = pkg.dependencies.get(ident.identHash);
          const resolution = project.storedResolutions.get(descriptor.descriptorHash);
          if (!resolution) {
            throw new Error(`Assertion failed: The resolution should have been registered`);
          }
          const nextPkg = project.storedPackages.get(resolution);
          if (!nextPkg) {
            throw new Error(`Assertion failed: The package should have been registered`);
          }
          await traverse(nextPkg);
        }
      } finally {
        result.releaseFs?.();
        await report.finalize();
      }
    };

    for (const packageName of packageNames) {
      const ident = structUtils.parseIdent(packageName);
      const descriptor = workspace.dependencies.get(ident.identHash);
      const resolution = project.storedResolutions.get(descriptor.descriptorHash);
      if (!resolution) {
        throw new Error('Assertion failed: The resolution should have been registered');
      }
      const pkg = project.storedPackages.get(resolution);
      if (!pkg) {
        throw new Error('Assertion failed: The package should have been registered');
      }
      await traverse(pkg);
    }
    return { packages, packageWorkspaces };
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
