import { Command } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';

export default class SetupCommand extends BaseCommand {
  static usage = Command.Usage({
    description: 'Setup rescript dependencies',
  });

  @Command.Path('res', 'setup')
  async execute() {
    return 0;
  }
}
