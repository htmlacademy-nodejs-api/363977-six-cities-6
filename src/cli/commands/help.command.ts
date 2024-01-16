import { Command } from './command.interface.js';
import chalk from 'chalk';
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.blueBright(`
        A program for preparing data for a REST API server.
        Example:
            cli.js --<command> [--arguments]
        Commands:
            --version:                   # it displays the version number
            --help:                      # it prints command descriptions
            --import <path>:             # it imports data from TSV
            --generate <n> <path> <url>  # it generates an arbitrary amount of test data
    `));
  }
}
