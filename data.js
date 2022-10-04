#!/usr/bin/env node
// ELEMENTOS QUE NECESITO PARA COMENZAR

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch'); 
const colors = require('colors');
colors.setTheme({
    ok: ['green', 'bold', 'underline'],
    data: ['grey', 'bold', 'underline'],
    help: ['cyan', 'bold'],
    warn: ['yellow', 'bold'],
    debug: ['blue','bold'],
    error: ['red', 'bold', 'underline'],
});
// Analizar si existe una ruta
// recordar que route es routeEx
const route = inputPath => fs.existsSync(inputPath);

// Analizar si es directorio 
const viewFolder = inputPath => fs.lstatSync(inputPath).isDirectory();

// Filtrar archivos.md por extension
const fileMDExtension = file => path.extname(file) === '.md';

// Leer directorio
const readFolder = directory => fs.readdirSync(directory, 'utf8');

// Comparacion por expresion regular para extraccion de links 
const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

// Leer directorio y retornar archivos.md
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
const extractionLinks = (pathAbsolute) => {
  let allLinks = [];
  pathAbsolute.forEach(file => {
    const dataFiles = fs.readFile(file);
    // extraccion de links con expresiones regulares
    if(regExp.test(dataFiles)) {
      let arrLinks = dataFiles.match(regExp);
      console.log(`En los archivos ${file} existen ${arrLinks.leng} links por analizar.`.help);
      arrLinks.forEach(arrayLinks => {
        allLinks.push({
          'file': file,
          'href': arrayLinks,
        })
      })
    } else {
      console.log(` En los archivos ${file} no existen links para analizar.`.error);
    }
  });
};

const resReadFolder = readFolder (`C:\Users\emily\SCL021-md-links\testforlinks`);
console.log(resReadFolder);

// extraer data de los links
const dataLinks = links => {
  const objects = links.map(e=> {
    return fetch(e)
    .then((res) => {
      return {
        file: e.file,
        href: e.href,
        status: error.status === undefined ? 'No existe ningun status': error.status,
        ok: 'fail',
      }
    })
  });
  return Promise.all(objects)
}

// exportado de funciones
module.exports = {
  route,
  viewFolder, 
  fileMDExtension,
  readFolder, 
  regExp, 
  extractionMDFiles,
  extractionLinks,
  dataLinks
};

