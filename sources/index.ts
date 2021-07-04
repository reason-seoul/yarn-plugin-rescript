import type { Plugin } from '@yarnpkg/core';

import SetupCommand from './commands/setup';

const plugin: Plugin = {
  hooks: {
  },
  commands: [
    SetupCommand,
  ],
};

export default plugin;
