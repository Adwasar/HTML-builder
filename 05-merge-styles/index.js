const fs = require('fs/promises');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist');

(async function bundleStyles() {
  const filesAll = await fs.readdir(pathToStyles, {withFileTypes: true});
  const stylesAll = [];

  filesAll.forEach(async (file) => {
    const currentPath = path.join(pathToStyles, file.name);

    if (path.extname(currentPath) === '.css' ) {
      const fileContent = await fs.readFile(currentPath, 'utf8');
      stylesAll.push(fileContent);
    }

    await fs.writeFile(path.join(pathToBundle, 'bundle.css'), stylesAll);
  });
})();