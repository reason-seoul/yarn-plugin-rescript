import { Cli } from 'clipanion';
import type { Ident, Descriptor } from '@yarnpkg/core';
import { Configuration, Project, structUtils, ThrowReport } from '@yarnpkg/core';
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

    const config = await Configuration.find(
      this.context.cwd,
      this.context.plugins,
    );

    const { project, workspace } = await Project.find(
      config,
      this.context.cwd,
    );

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

    const resConfig = JSON.parse(await fsApi.readFileAsync(resConfigPath, 'utf8'));
    const resDependencies = resConfig['bs-dependencies'] || [];
    const resDevDependencies = resConfig['bs-dev-dependencies'] || [];

    await project.resolveEverything({
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

      exitCode = await essentials.run([
        'add',
        [...dependenciesNeedInstall].join(' ')
      ], this.context);
      if (exitCode !== 0) {
        return exitCode;
      }
      for (const dependencyName of dependenciesNeedInstall) {
        const ident = structUtils.parseIdent(dependencyName);
        const descriptor = topLevelPkg.dependencies.get(ident.identHash);
        dependencyResolutions.set(dependencyName, descriptor!);
      }

      exitCode = await essentials.run([
        'add',
        '--dev',
        [...devDependenciesNeedInstall].join(' '),
      ], this.context);
      if (exitCode !== 0) {
        return exitCode;
      }
      for (const dependencyName of devDependenciesNeedInstall) {
        const ident = structUtils.parseIdent(dependencyName);
        const descriptor = topLevelPkg.dependencies.get(ident.identHash);
        devDependencyResolutions.set(dependencyName, descriptor!);
      }
    }

    // Unplug all the ReScript dependencies
    const pnp = Cli.from(Pnp.commands);
    exitCode = await pnp.run([
      'unplug',
      [...dependencyResolutions.keys(), ...devDependencyResolutions.keys()].join(' '),
    ], this.context);
    if (exitCode !== 0) {
      return exitCode;
    }

    // Link to node_modules
    const nodeModules = ppath.join(project.cwd, Filename.nodeModules);
    const allDependenciesToDescriptors = new Map([...dependencyResolutions, ...devDependencyResolutions]);
    for (const [packageName, { ident, descriptor }] of allDependenciesToDescriptors) {
      const resolution = project.storedResolutions.get(descriptor.descriptorHash);
      const pkg = project.storedPackages.get(resolution);
      const unpluggedPath = pnpUtils.getUnpluggedPath(pkg, { configuration: project.configuration });

      const targetPath = ppath.join(unpluggedPath, Filename.nodeModules, packageName);
      const destPathDir = ppath.join(nodeModules, '@' + ident.scope);
      const destPath = ppath.join(nodeModules, packageName);

      await fsApi.mkdirPromise(destPathDir, { recursive: true });
      await link(targetPath, destPath);
    }

    return exitCode;
  }
}
