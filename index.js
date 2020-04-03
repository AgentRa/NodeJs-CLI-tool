const fs = require('fs');
const path = require('path');

const { pipeline } = require('stream');
const caesarCipher = require('./caesarCipher');
const createTransformStream = require('./createTransformStream');

const commands = require('./createCommander');
const { action, shift, input, output } = commands.opts();

const readStream = input
  ? fs.createReadStream(path.join(__dirname, input))
  : process.stdin;

const writeStream = output
  ? fs.createWriteStream(path.join(__dirname, output), { flags: 'a+' })
  : process.stdout;

const transform = new createTransformStream(caesarCipher, action, shift);

pipeline(readStream, transform, writeStream, err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
