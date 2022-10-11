#!/usr/bin/env node
const { mdLinks } = require('./index');
const color = require('colors');
const gradient = require('gradient-string');

const [ , ,termPath, termValidate] = process.argv;

// Validación de parámetros por terminal
if (termPath && termValidate == undefined) {
    mdLinks(termPath)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(color.bold.red(rej));
    })
}
else if (termPath && termValidate == '--validate') {
    mdLinks(termPath, termValidate)
        .then(res => {
            console.log(res);
        })
        .catch(rej => {
            console.log(color.bold.underline.red(rej));
        })
}
else if (termPath && termValidate == '--stats') {
    mdLinks(termPath, termValidate)
        .then(res => {
            console.log(gradient.cristal(res));
        })
        .catch(rej => {
            console.log(color.bold.underline.red(rej));
        })
}

else {
    console.log(color.bold.red('Error en los parámetros utilizados.'));
}