// ELEMENTOS QUE NECESITO PARA COMENZAR
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const { realpath } = require('fs/promises');
const color = requiere('colors');

// Analizar si existe una ruta
// recordar que route es routeEx
const route = inputPath => fs.existsSync(inputPath);

// Analizar si es directorio 
// recordar que es readFolder
const viewFolder = inputPath => fs.lstatSync(inputPath).isDirectory();

// Filtrar archivos.md por extension
// recordar que mi filemdextension es fileextensionMD
const fileMDExtension = file => path.extname(file) === '.md';

// Leer directorio
const readFolder = directory => fs.readdirSync(directory, 'utf8');

// Comparacion por expresion regular y extraccion de links 
const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

// Leer directorio y retornar archivos.md
// mi extractionmdfiles es el extractionfilesmd 
const extractionMDFiles = directory => {
  const dataDirectory = readFolder(directory);
  let arrayFiles = dataDirectory.filter((element) => {
      if (fileMDExtension(element)) {
        return element;
      }
  });
  return arrayFiles;
};

// extraer en array los links por cada archivo.md
const extractionLinks = pathAbsolute => {
  let allLinks = [];
  pathAbsolute.forEach(file => {
    const dataFiles = fs.readFile(file);
    // extraccion de links con expresiones regulares
    if(regExp.test(dataFiles)) {
      let arrLinks = dataFiles.match(regExp);
      console.log(`En los archivos ${file} existen ${arrLinks.lenght} links por analizar.`);
      arrLinks.forEach(arrayLinks => {
        allLinks.push({
          'file': file,
          'href': arrayLinks,
        })
      })
    } else {
      console.log(`En los archivos ${file} no existen links para analizar.`);
    }
  });
};

module.exports = {
  route,
  viewFolder, 
  fileMDExtension,
  readFolder, 
  regExp, 
  extractionMDFiles,
  extractionLinks,
};

