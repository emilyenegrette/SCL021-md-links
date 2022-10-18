#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const color = require('colors');


// ¿ruta existe?
const routeEx = inputPath => fs.existsSync(inputPath);

// ¿es directorio?
const isFolder = inputPath => fs.lstatSync(inputPath).isDirectory();

// lectura de directorio
const readFolder = directory => fs.readdirSync(directory, 'utf8');

// filtrar archivos .md por extensión
const fileExtensionMD = file => path.extname(file) === '.md';

// lectura de archivo .md
const readFile = file => fs.readFileSync(file, 'utf8');

// expresión regular para hacer la comparación y extracción de links
const regExp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

// función que lee directorio y retorna los archivos.md
const extractionFilesMD = directory => {
    const dataDirectory = readFolder(directory);
    let arrayFiles = dataDirectory.filter((element) => {
        if (fileExtensionMD(element)) {
            return element;
        }
    });
    return arrayFiles;
};

// función que va a extraer en un array con links por cada archivo .md 
const extractionLinks = pathAbsolute => {
    let allLinks = [];
    pathAbsolute.forEach(file => {
        const dataFiles = readFile(file);
        // se extraen los links con regExp
        if (regExp.test(dataFiles)) {
            let arLinks = dataFiles.match(regExp);
            console.log(color.bold.cyan(`- En ${file} existen ${arLinks.length} links para analizar.`));
            arLinks.forEach(arrayLinks => {
                allLinks.push({
                    'file': file,
                    'href': arrayLinks,
                })
            })
        } else {
            console.log(color.bold.red(`- En ${file} no existen links para analizar.`));
        }
    });
    return allLinks;
};

//Función para extraer informacion de los links
const dataLinks = links => {
    const objs = links.map(e => {
        return fetch(e)
            .then((response) => {
                return {
                    file: e.file,
                    href: e.href,
                    status: response.status,
                    ok: 'ok',
                }
            })
            .catch((error) => {
                return {
                    file: e.file,
                    href: e.href,
                    status: error.status === undefined ? 'No existe status' : error.status,
                    ok: 'fail',
                }
            })
    });
    return Promise.all(objs)
}

module.exports = {
    routeEx,
    isFolder,
    fileExtensionMD,
    extractionFilesMD,
    extractionLinks,
    dataLinks,
};