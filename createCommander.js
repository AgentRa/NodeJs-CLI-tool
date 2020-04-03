const fs = require('fs');
const { program } = require('commander');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-a, --action [type],', 'an action encode/decode')
  .requiredOption('-s, --shift <number>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file');

program.parse(process.argv);

const { action, shift, output } = program.opts();

if (action !== 'decode' && action !== 'encode') {
  process.stderr.write(
    'Invalid parameter! Please, write encode/decode for action parameter\n'
  );
  process.on('exit', () => {
    const exit = process.exit;
    console.log(`About to exit with code: ${5}`);
    exit(1);
  });
}

if (typeof +shift !== 'number') {
  process.stderr.write(
    'Invalid parameter! Please, write number for shift parameter\n'
  );
  console.log(`About to exit with code: ${6}`);
}

fs.stat(`${output}`, err => {
  return err === null
    ? (program.correctWay = true)
    : process.on('exit', () => {
        program.correctWay = false;
      });
});

module.exports = program;
