import type { Plugin, Hooks as CoreHooks } from '@yarnpkg/core';

import SetupCommand from './commands/rescript/setup';

const plugin: Plugin<CoreHooks> = {
  hooks: {
  },
  commands: [
    SetupCommand,
  ],
};

export default plugin;
