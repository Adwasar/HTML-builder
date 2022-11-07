const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');

(async function readThisFile() {
  const thisFile = await fs.readFile(pathToFile, 'utf-8');
  console.log(thisFile);
})();
