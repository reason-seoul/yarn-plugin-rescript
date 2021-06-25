import type { Usage } from 'clipanion';
import { Cli, Command } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';

export default class AddCommand extends BaseCommand {
  static paths = [
    ['res', 'add'],
  ];

  static usage: Usage = Command.Usage({
    description: '',
    details: `
    `,
  });

  async execute() {
  }
}
