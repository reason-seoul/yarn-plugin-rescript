import type { Plugin } from '@yarnpkg/core';

import InitCommand from './commands/init';
import LinkCommand from './commands/link';

const plugin: Plugin = {
  hooks: {
  },
  commands: [
    InitCommand,
    LinkCommand,
  ],
};

export default plugin;
