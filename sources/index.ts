import type { Plugin } from '@yarnpkg/core';

import InitCommand from './commands/init';
import LinkCommand from './commands/link';
import AddCommand from './commands/add';

const plugin: Plugin = {
  hooks: {
  },
  commands: [
    InitCommand,
    LinkCommand,
    AddCommand,
  ],
};

export default plugin;
