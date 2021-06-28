import { Command, UsageError } from 'clipanion';
import { Package, semverUtils, Workspace, LocatorHash, miscUtils, Locator } from '@yarnpkg/core';
import {
  Cache,
  Configuration,
  Project,
  ThrowReport,
  structUtils,
  formatUtils,
} from '@yarnpkg/core';
import { PortablePath, xfs } from '@yarnpkg/fslib';
import { ppath, NodeFS, Filename } from '@yarnpkg/fslib';
import { BaseCommand, WorkspaceRequiredError } from '@yarnpkg/cli';
import Essentials from '@yarnpkg/plugin-essentials';
import micromatch from 'micromatch';
import semver from 'semver';

function getUnpluggedPath(locator: Locator, {configuration}: {configuration: Configuration}) {
  return ppath.resolve(configuration.get(`pnpUnpluggedFolder`), structUtils.slugifyLocator(locator));
}

// 1. bsconfig.json 에서 디펜던시 정보 읽는다!
// 2. rescript 의존성을 node_modules 아래에 복사한다!

export default class SetupCommand extends BaseCommand {
  @Command.Path('set', 'rescript')
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

    if (!workspace)
      throw new WorkspaceRequiredError(project.cwd, this.context.cwd);

    await project.restoreInstallState();

    const fsApi = new NodeFS();
    const resConfigPath = ppath.join(workspace.cwd, 'bsconfig.json' as Filename);
    const resConfigExist = await fsApi.existsPromise(resConfigPath);
    if (!resConfigExist) {
      console.log('TODO: res init first');
      return 0;
    }

    const resConfig = JSON.parse(await fsApi.readFilePromise(resConfigPath, 'utf8'));
    const resDependencies = resConfig['bs-dependencies'] || [];
    const resDevDependencies = resConfig['bs-dev-dependencies'] || [];

    const patterns: Array<string> = ['gentype'].concat(resDependencies, resDevDependencies)

    const unreferencedPatterns = new Set(patterns);

    const matchers = patterns.map(pattern => {
      const patternDescriptor = structUtils.parseDescriptor(pattern);
      const pseudoDescriptor = patternDescriptor.range !== `unknown`
        ? patternDescriptor
        : structUtils.makeDescriptor(patternDescriptor, `*`);

      if (!semver.validRange(pseudoDescriptor.range))
        throw new UsageError(`The range of the descriptor patterns must be a valid semver range (${structUtils.prettyDescriptor(configuration, pseudoDescriptor)})`);

      return (pkg: Package) => {
        const stringifiedIdent = structUtils.stringifyIdent(pkg);
        if (!micromatch.isMatch(stringifiedIdent, structUtils.stringifyIdent(pseudoDescriptor)))
          return false;

        if (pkg.version && !semverUtils.satisfiesWithPrereleases(pkg.version, pseudoDescriptor.range))
          return false;

        unreferencedPatterns.delete(pattern);

        return true;
      };
    });

    const getSelectedPackages = (roots: Array<Workspace>) => {
      const seen: Set<LocatorHash> = new Set();
      const selection: Array<Package> = [];

      const traverse = (pkg: Package, depth: number) => {
        if (seen.has(pkg.locatorHash))
          return;

        seen.add(pkg.locatorHash);

        // Note: We shouldn't skip virtual packages, as
        // we don't iterate over the devirtualized copies.
        if (!project.tryWorkspaceByLocator(pkg) && matchers.some(matcher => matcher(pkg)))
          selection.push(pkg);

        // Don't recurse unless requested
        if (depth > 0 && !false)
          return;

        for (const dependency of pkg.dependencies.values()) {
          const resolution = project.storedResolutions.get(dependency.descriptorHash);
          if (!resolution)
            throw new Error(`Assertion failed: The resolution should have been registered`);

          const nextPkg = project.storedPackages.get(resolution);
          if (!nextPkg)
            throw new Error(`Assertion failed: The package should have been registered`);

          traverse(nextPkg, depth + 1);
        }
      };

      for (const workspace of roots) {
        const pkg = project.storedPackages.get(workspace.anchoredLocator.locatorHash);
        if (!pkg)
          throw new Error(`Assertion failed: The package should have been registered`);

        traverse(pkg, 0);
      }

      return selection;
    };

    const selectedPackages = getSelectedPackages([workspace])
    
    if (unreferencedPatterns.size > 0)
      throw new UsageError(`${formatUtils.prettyList(configuration, unreferencedPatterns, formatUtils.Type.CODE)} in bsconfig.json and not in package.json`)

    const selection = miscUtils.sortMap(selectedPackages, pkg => {
      return structUtils.stringifyLocator(pkg);
    });

    const fetcher = configuration.makeFetcher();
    const fetcherOptions = {
      project,
      fetcher,
      cache,
      report: new ThrowReport,
      checksums: project.storedChecksums,
    }

    for (const pkg of selection) {
      // postinstall을 사용하는 package는 unplug된 폴더를 사용
      const unplugPath = getUnpluggedPath(pkg, { configuration })
      if (await xfs.existsPromise(unplugPath)) {
        await xfs.copyPromise(project.cwd, unplugPath);
      } else {
        const fetchResult = await fetcher.fetch(pkg, fetcherOptions)
        await xfs.copyPromise(project.cwd, PortablePath.dot, {
          baseFs: fetchResult.packageFs as any,
          overwrite: false
        });
      }
    }

    return exitCode;
  }
}
