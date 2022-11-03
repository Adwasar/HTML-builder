const fs = require('fs');
const path = require('path');

async function showFilesInFolder() {
  const files = await fs.promises.readdir('03-files-in-folder/secret-folder', {withFileTypes: true})

  for (const file of files) {
    if (file.isFile()) {
      let stat = await fs.promises.stat(path.join(__dirname, `secret-folder/${file.name}`));
      console.log(`${file.name.split('.').shift()} - ${file.name.split('.').pop()} - ${stat.size / 1000} KB`)
    }
  }

}
showFilesInFolder();