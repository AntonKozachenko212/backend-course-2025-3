import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
  .name('lab3')
  .version('1.0')
  .requiredOption('-i, --input <path>', 'Input JSON file path')
  .option('-o, --output', 'Write results to result.txt')
  .option('-d, --display', 'Display results on terminal')
  .option('-m, --mfo', 'Include MFO code in output')
  .option('-n, --normal', 'Only include records with COD_STATE === 1');

program.parse();

const options = program.opts();

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (options.display) {
  console.log("щось має бути");
}

if (options.output) {
  console.log("щось має бути");
}

