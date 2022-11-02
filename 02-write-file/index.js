
const fs = require('fs');
const process = require('process');
const { stdin, stdout } = process;

let writeableStream = fs.createWriteStream('02-write-file/text.txt');

stdout.write('Hi, write some word:\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Good bye!\n');
    process.exit();
  } else {
    writeableStream.write(data);
    stdout.write('text wrote in text.txt\n');
  }
});

process.on('SIGINT', () => {
  stdout.write('\nGood bye!\n');
  process.exit();
});