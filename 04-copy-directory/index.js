const fs = require('fs/promises');

(async function copyDir() {
  const files = await fs.readdir('04-copy-directory/files');

  await fs.mkdir('04-copy-directory/files-copy', {recursive: true});

  files.forEach((file) => {
    fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`);
  });

})();