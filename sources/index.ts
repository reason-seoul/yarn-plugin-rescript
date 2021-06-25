import { spawn } from 'child_process';
import type { Plugin, Hooks as CoreHooks } from '@yarnpkg/core';

import SetupCommand from './commands/rescript/setup';

const afterAllInstalled: NonNullable<CoreHooks['afterAllInstalled']> = () => {
  // 얀셉션...!
  const yarn = spawn('yarn', ['res', 'setup'], { encoding: 'utf8', shell: true });
  yarn.stdout.on('data', console.log);
  yarn.stderr.on('data', console.error);
  yarn.on('close', code => {
    if (code !== 0) {
      process.exit(code);
    }
    console.log('Setup ReScript successfully!');
  });
};

const plugin: Plugin<CoreHooks> = {
  hooks: {
    afterAllInstalled,
  },
  commands: [
    SetupCommand,
  ],
};

export default plugin;
