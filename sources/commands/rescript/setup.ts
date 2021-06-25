import { Cli } from 'clipanion';
import { Configuration, Project, miscUtils, structUtils, ThrowReport } from '@yarnpkg/core';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';
import { BaseCommand } from '@yarnpkg/cli';
import Essentials from '@yarnpkg/plugin-essentials';
import Pnp, { pnpUtils } from '@yarnpkg/plugin-pnp';

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

    await project.resolveEverything({
      lockfileOnly: true,
      report: new ThrowReport(),
    });

    const topLevelPkg = project.storedPackages.get(project.topLevelWorkspace.anchoredLocator.locatorHash);

    const resIdent = structUtils.makeIdent(null, 'rescript');
    const resDescriptor = topLevelPkg.dependencies.get(resIdent.identHash);

    if (!resDescriptor) {
      const essentials = Cli.from(Essentials.commands);
      exitCode = await essentials.run(['add', '--dev', 'rescript'], this.context);
      if (exitCode !== 0) {
        return exitCode;
      }

      const pnp = Cli.from(Pnp.commands);
      exitCode = await pnp.run(['unplug', 'rescript'], this.context);
      if (exitCode !== 0) {
        return exitCode;
      }
    }

    const resResolution = project.storedResolutions.get(resDescriptor.descriptorHash);
    const resPkg = project.storedPackages.get(resResolution);

    const fsApi = new NodeFS();

    const root = ppath.join(project.cwd, Filename.nodeModules);
    await fsApi.mkdirPromise(root, { recursive: true });

    const resUnpluggedPath = pnpUtils.getUnpluggedPath(resPkg, {configuration: project.configuration});
    const resTargetPath = ppath.join(resUnpluggedPath, 'node_modules', 'rescript');
    const resDestPath = ppath.join(root, 'rescript');

    async function link() {
      try {
        await fsApi.symlinkPromise(resTargetPath, resDestPath);
      } catch (err) {
        if (err?.code === 'EEXIST') {
          await fsApi.unlinkPromise(resDestPath);
          await link();
        }
      }
    }

    await link();

    return exitCode;
  }
}
