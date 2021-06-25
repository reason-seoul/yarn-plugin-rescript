import { Cli, Command, Usage } from 'clipanion';
import { BaseCommand } from '@yarnpkg/cli';

export default class RemoveCommand extends BaseCommand {
  static paths = [
    ['res', 'remove'],
  ];

  async execute() {
  }
}
