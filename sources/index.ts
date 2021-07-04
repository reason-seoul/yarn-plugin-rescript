import type { Plugin } from '@yarnpkg/core';

import SetupCommand from './commands/setup';

const plugin: Plugin = {
  hooks: {
    afterAllInstalled: async () => {
      console.log("afterAllInstalled")
    },
  },
  commands: [
    SetupCommand,
  ],
};

export default plugin;
