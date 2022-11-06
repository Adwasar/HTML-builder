const fs = require('fs/promises');
const path = require('path');

const pathToHTMLTemplate = path.join(__dirname, 'template.html');
const pathToStyles = path.join(__dirname, 'styles')
const pathToComponents = path.join(__dirname, 'components');
const pathToAssets = path.join(__dirname, 'assets')
const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToProjectDistHTML = path.join(pathToProjectDist, 'index.html');
const pathToProjectDistAssets = path.join(pathToProjectDist, 'assets');

(async function buildHTML() {
  let HTMLTemplate = await fs.readFile(pathToHTMLTemplate, 'utf8');
  let HTMLComponents = await fs.readdir(pathToComponents, { withFileTypes: true });

  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

  for (let file of HTMLComponents) {
    let data = await fs.readFile(path.join(pathToComponents, file.name), 'utf8');
    let fileName = `{{${file.name.split('.').shift()}}}`;
    HTMLTemplate = HTMLTemplate.replace(fileName, data);
    fs.writeFile(pathToProjectDistHTML, HTMLTemplate);
  }

  await fs.writeFile(pathToProjectDistHTML, HTMLTemplate);

})();

(async function buildCSS(){
  styleFiles = await fs.readdir(pathToStyles, { withFileTypes: true} )
  stylesArr = [];

  for (let file of styleFiles) {
    const currentPath = path.join(pathToStyles, file.name);

    if (path.extname(currentPath) == '.css') {
      const fileContent = await fs.readFile(currentPath, 'utf8');
      stylesArr.push(fileContent);
    }
  }

  await fs.writeFile(path.join(pathToProjectDist, 'style.css'), stylesArr);
})();

(async function copyFiles(currentDir, projectDistDir){
  const assetFiles = await fs.readdir(currentDir, { withFileTypes: true });

  const projectDistAssets = await fs.mkdir(path.join(projectDistDir), { recursive: true });

  for (let file of assetFiles) {
    const pathCurrentFile = path.join(currentDir, file.name);
    const pathCurrentDir = path.join(projectDistDir, file.name);

    if (file.isDirectory()) {
      await copyFiles(pathCurrentFile, pathCurrentDir);
    } else {
      await fs.copyFile(pathCurrentFile, pathCurrentDir);
    }
  }

})(pathToAssets, pathToProjectDistAssets);