import type { Plugin } from '@yarnpkg/core';

import LinkCommand from './commands/link';

const plugin: Plugin = {
  hooks: {
  },
  commands: [
    LinkCommand,
  ],
};

export default plugin;
