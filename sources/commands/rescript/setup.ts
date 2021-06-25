import { Cli } from 'clipanion';
import type { Ident, Descriptor } from '@yarnpkg/core';
import {
  Cache,
  Configuration,
  Project,
  StreamReport,
  ThrowReport,
  MessageName,
  structUtils,
  formatUtils,
} from '@yarnpkg/core';
import type { PortablePath } from '@yarnpkg/fslib';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';
import { BaseCommand } from '@yarnpkg/cli';
import Essentials from '@yarnpkg/plugin-essentials';
import Pnp, { pnpUtils } from '@yarnpkg/plugin-pnp';

// 1. bsconfig.json 에서 디펜던시 정보 읽는다!
// 2. rescript 의존성을 unplug 한다! (없으면 add 함)
// 3. node_modules 아래 symbolic link 만든다!

export default class SetupCommand extends BaseCommand {
  static paths = [
    ['res', 'setup'],
  ];

  async execute() {
    if (!Essentials.commands) {
      throw new Error(
        'Yarn commands are not found. Please upgrade to Yarn 2.'
      );
    }

    let exitCode = 0;

    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    const { project, workspace } = await Project.find(configuration, this.context.cwd);
    const cache = await Cache.find(configuration);

    const fsApi = new NodeFS();
    async function link(target: PortablePath, dest: PortablePath) {
      try {
        await fsApi.symlinkPromise(target, dest);
      } catch (err) {
        if (err?.code === 'EEXIST') {
          await fsApi.unlinkPromise(dest);
          await link(target, dest);
        }
      }
    }

    const resConfigPath = ppath.join(workspace.cwd, 'bsconfig.json');
    const resConfigExist = await fsApi.existsPromise(resConfigPath);
    if (!resConfigExist) {
      console.log('TODO: res init first');
      return 0;
    }

    const resConfig = JSON.parse(await fsApi.readFilePromise(resConfigPath, 'utf8'));
    const resDependencies = resConfig['bs-dependencies'] || [];
    const resDevDependencies = resConfig['bs-dev-dependencies'] || [];

    await project.resolveEverything({
      cache,
      lockfileOnly: true,
      report: new ThrowReport(),
    });

    const topLevelPkg = project.storedPackages.get(project.topLevelWorkspace.anchoredLocator.locatorHash);

    type ResolutionBase = { ident: Ident, descriptor: Descriptor };

    const dependencyResolutions = new Map<string, ResolutionBase>();
    const dependenciesNeedInstall = new Set<string>();
    for (const packageName of resDependencies) {
      const ident = structUtils.parseIdent(packageName);
      const descriptor = topLevelPkg.dependencies.get(ident.identHash);
      if (descriptor) {
        dependencyResolutions.set(packageName, { ident, descriptor });
      } else {
        dependenciesNeedInstall.add(packageName);
      }
    }

    const devDependencyResolutions = new Map<string, ResolutionBase>();
    const devDependenciesNeedInstall = new Set<string>();
    for (const packageName of resDevDependencies) {
      const ident = structUtils.parseIdent(packageName);
      const descriptor = topLevelPkg.dependencies.get(ident.identHash);
      if (descriptor) {
        devDependencyResolutions.set(packageName, { ident, descriptor });
      } else {
        devDependenciesNeedInstall.add(packageName);
      }
    }

    // TODO: with or without install
    if (true) {
      const essentials = Cli.from(Essentials.commands);

      if (dependenciesNeedInstall.size > 0) {
        exitCode = await essentials.run([
          'add',
          [...dependenciesNeedInstall].join(' '),
        ], this.context);
        if (exitCode !== 0) {
          return exitCode;
        }
        for (const packageName of dependenciesNeedInstall) {
          const ident = structUtils.parseIdent(packageName);
          const descriptor = topLevelPkg.dependencies.get(ident.identHash);
          if (descriptor) {
            dependencyResolutions.set(packageName, { ident, descriptor });
          }
        }
      }

      if (devDependenciesNeedInstall.size > 0) {
        exitCode = await essentials.run([
          'add',
          '--dev',
          [...devDependenciesNeedInstall].join(' '),
        ], this.context);
        if (exitCode !== 0) {
          return exitCode;
        }
        for (const packageName of devDependenciesNeedInstall) {
          const ident = structUtils.parseIdent(packageName);
          const descriptor = topLevelPkg.dependencies.get(ident.identHash);
          if (descriptor) {
            devDependencyResolutions.set(packageName, { ident, descriptor });
          }
        }
      }
    }

    const allDependencyResolutions = new Map([...dependencyResolutions, ...devDependencyResolutions]);

    // TODO: Collect all bs-dependencies
    // 생각해보니까 Traversal 할 때 ZipFS 로 열어야함
    // 디펜던시가 사용하는 Resolver 가 뭔지 알 수 없음
    // 예를 들면 뭐... File이나 Portal 같은거 쓸 수도 있고...

    // Unplug all the ReScript dependencies
    const unplug = await StreamReport.start({
      configuration,
      stdout: this.context.stdout,
      json: this.json,
    }, async report => {
      for (const [, { descriptor }] of allDependencyResolutions) {
        const resolution = project.storedResolutions.get(descriptor.descriptorHash);
        const pkg = project.storedPackages.get(resolution);
        const unpluggedPath = pnpUtils.getUnpluggedPath(pkg, { configuration });

        const version = pkg.version ?? `unknown`;
        const dependencyMeta = project.topLevelWorkspace.manifest.ensureDependencyMeta(
          structUtils.makeDescriptor(pkg, version),
        );
        dependencyMeta.unplugged = true;

        report.reportInfo(
          MessageName.UNNAMED,
          `Will unpack ${structUtils.prettyLocator(configuration, pkg)} to ${formatUtils.pretty(configuration, pnpUtils.getUnpluggedPath(pkg, {configuration}), formatUtils.Type.PATH)}`,
        );
        report.reportJson({
          locator: structUtils.stringifyLocator(pkg),
          version,
        });
      }
      await project.topLevelWorkspace.persistManifest();

      report.reportSeparator();

      await project.install({ cache, report });
    });
    exitCode = unplug.exitCode();
    if (exitCode !== 0) {
      return exitCode;
    }

    // Link to node_modules
    const nodeModules = ppath.join(project.cwd, Filename.nodeModules);
    for (const [packageName, { ident, descriptor }] of allDependencyResolutions) {
      const resolution = project.storedResolutions.get(descriptor.descriptorHash);
      const pkg = project.storedPackages.get(resolution);
      const unpluggedPath = pnpUtils.getUnpluggedPath(pkg, { configuration });

      const targetPath = ppath.join(unpluggedPath, Filename.nodeModules, packageName);
      const destPath = ppath.join(nodeModules, packageName);

      if (ident.scope) {
        const destPathDir = ppath.join(nodeModules, '@' + ident.scope);
        await fsApi.mkdirPromise(destPathDir, { recursive: true });
      }

      await link(targetPath, destPath);
    }

    return exitCode;
  }
}
