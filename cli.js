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

// revisar referencia que paso Jackie para el process.argv jiji
/* const {mdLinks, absoluteLink} = require("./index.js")
const input = [process.argv[3], process.argv[4]]
let options = "";

if(input[0] && input[1] === undefined) {
    options = input[0]
} else if (input[0] && input[1]){
    options = input [0] + ' ' + input[1]
} else {
    options = "--stats"
}

mdLinks(absoluteLink, options)
.then(out => {
    console.log(out)
})
.catch(error => {
    console.log(error)
}) */