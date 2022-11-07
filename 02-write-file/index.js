
const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;

const pathToFile = path.join(__dirname, 'text.txt');

(function writeToFile() {
  const writeAbleStream = fs.createWriteStream(pathToFile);

  stdout.write('Hi, write some word:\n');

  stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
      stdout.write('Good bye!\n');
      process.exit();
    } else {
      writeAbleStream.write(data);
      stdout.write('text wrote in text.txt\n');
    }
  });

  process.on('SIGINT', () => {
    stdout.write('\nGood bye!\n');
    process.exit();
  });
})();
// test