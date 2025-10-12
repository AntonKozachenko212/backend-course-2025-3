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

let jsonData;
try {
  const fileContent = fs.readFileSync(options.input, 'utf8');
  jsonData = JSON.parse(fileContent);

  if (!Array.isArray(jsonData)) {
    throw new Error("Input file does not contain a JSON array.");
  }
} catch (err) {
  console.error(`Error processing file ${options.input}: ${err.message}`);
  process.exit(1);
}

let index = 1;
let outputLines = [];

jsonData.forEach((item) => {
  if (options.normal && item.COD_STATE != 1) {
    return;
  }

  let line = ``;
  if (options.mfo) {
    line += ` ${item.MFO}`;
  }
  line += ` ${item.SHORTNAME}`;

  outputLines.push(line);
  index += 1;
});

console.log(`Total records after filtering: ${outputLines.length}`);
if (options.display) {
  outputLines.forEach(line => console.log(line));
}

if (options.output) {
  try {
    fs.writeFileSync('result.txt', outputLines.join('\n'), 'utf8');
    console.log("Results written to result.txt");
  } catch (err) {
    console.error("Failed to write to result.txt:", err.message);
  }
}
