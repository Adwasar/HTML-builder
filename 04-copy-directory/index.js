const fs = require('fs/promises');
const path = require('path');

(async function copyDir() {
  const pathToFiles = path.join(__dirname, 'files');
  const pathToFilesCopy = path.join(__dirname, 'files-copy');
  const files = await fs.readdir(pathToFiles);

  await fs.mkdir(pathToFilesCopy, {recursive: true});

  files.forEach((file) => {
    fs.copyFile(path.join(pathToFiles, file), path.join(pathToFilesCopy, file));
  });

})();