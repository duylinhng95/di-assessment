import {Command} from 'commander';
import {main} from './app';

const program = new Command();

program
  .description(
    'Fetch a table from a Wikipedia page and generate a chart from numeric data.',
  )
  .version('1.0.0')
  .argument('<url>', 'The URL of the Wikipedia page')
  .option('-o, --output <path>', 'Output image file path', 'output.png')
  .action(main);

program.parse(process.argv);
