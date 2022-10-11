#!/usr/bin/env node
const { routeEx, isFolder, extractionFilesMD, fileExtensionMD, extractionLinks, dataLinks } = require('./data');
const color = require('colors');

const mdLinks = (inputPath, options) => {
  return new Promise(function (res, rej) {
    if (!routeEx(inputPath)) {
      rej('La ruta ingresada no es válida.')
    }
    // Filtramos por directorio relativo o archivo absoluto
    let filesAbsolute;
    //si ruta es directorio
    if (isFolder(inputPath)) {
      console.log(color.bold('Tu ruta es un directorio.'));
      //Función para analizar directorio
      filesAbsolute = extractionFilesMD(inputPath);
    }
    else {
      // Si la ruta es archivo .md
      if (fileExtensionMD(inputPath)) {
        console.log(color.bold('Tu ruta es un archivo.md'));
        filesAbsolute = [inputPath];
      }
      //Si la ruta NO es archivo .md
      else {
        rej(`La ruta ${inputPath} no corresponde a un archivo Markdown.`);
      }
    };

    // Utilizo la función para extraer links pero sin validar según la ruta absoluta (archivos.md)
    const links = extractionLinks(filesAbsolute);

    // Utilizo la función para extraer data de validación de todos los links
    const dataAllLinksValidate = dataLinks(links);

    if (options === undefined) {
      res(links)
    }
    else if (options === '--validate') {
      res(dataAllLinksValidate);
    }
    else if (options === '--stats'){
      res(`Existen ${links.length} links en total.`);
    }
  });
};

module.exports = {
  mdLinks,
};