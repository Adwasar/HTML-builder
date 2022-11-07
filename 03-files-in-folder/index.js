const fs = require('fs/promises');
const path = require('path');

const pathToSecretFolder = path.join(__dirname, 'secret-folder');

(async function showFilesInFolder() {
  const files = await fs.readdir(pathToSecretFolder, {withFileTypes: true})

  for (const file of files) {
    if (file.isFile()) {
      let stat = await fs.stat(path.join(`${pathToSecretFolder}/${file.name}`));
      console.log(`${file.name.split('.').shift()} - ${file.name.split('.').pop()} - ${stat.size / 1000} KB`)
    }
  }
})();