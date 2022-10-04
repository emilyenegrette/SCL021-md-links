#!/usr/bin/env node

const { route, viewFolder, fileMDExtension, extractionMDFiles, extractionLinks, dataLinks} = require ('./data');
const colors = require('colors');
colors.setTheme({
    ok: ['green', 'bold', 'underline'],
    data: ['grey', 'bold', 'underline'],
    help: ['cyan', 'bold'],
    warn: ['yellow', 'bold'],
    debug: ['blue','bold'],
    error: ['red', 'bold', 'underline'],
});

const mdLinks = (inputPath, options) => {
    return new Promise(function (res, rej){
        if (!route(inputPath)) {
            rej('La ruta ingresada es invalida.');
        }
// filtrado a ver si es directorio relativo o archivo absoluto.

let filesAbsolute;
// si es directorio entonces...
    if (viewFolder(inputPath)){
        console.log(`La ruta es un directorio`.help);   
}
// vamos a analizar si es directorio
filesAbsolute = extractionMDFiles(inputPath);
// si es archivo.md
    if(fileMDExtension(inputPath)){
        console.log(`Tu ruta es un archivo.md`.help);
        filesAbsolute = [inputPath];
    }
    // si la ruta NO es un archivo.md
    else {
        rej(`La ruta ${inputPath} no es un Markdown Link`);        
    }
});
};

// vamos a extraer los links pero sin validacion de ruta
const links = extractionLinks(filesAbsolute);

// vamos a extraer la data para valdar los links
const dataLinksValidate = dataLinks(links);
    if (options === undefined){
        res(links)
    }
    else if (options === '--validate') {
        res (dataLinksValidate);
    }
    else if (options === '--stats') {
        res(`Existen ${links.length} links en total.`);
    };

// exportado
module.exports = {
    mdLinks,
};