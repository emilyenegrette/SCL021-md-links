#!/usr/bin/env node
const {mdLinks} = require('./index'); 
const colors = require('colors');
colors.setTheme({
    ok: ['green', 'bold', 'underline'],
    data: ['grey', 'bold', 'underline'],
    help: ['cyan', 'bold'],
    warn: ['yellow', 'bold'],
    debug: ['blue','bold'],
    error: ['red', 'bold', 'underline'],
});

const [termMethod, termPath, termValidate] = process.argv; 

// validaciones para la terminal
if (termMethod == 'mdLinks' && termPath && termValidate == undefined) {
  mdLinks(termPath)
  .then(res => {
      console.log(res.ok);
  })
  .catch(rej => {
    console.log(rej.error);
  })
} else if (termMethod == 'mdLinks' && termPath && termValidate == '--validate'){
  mdLinks(termPath, termValidate)
  .then(res => {
      console.log(res.ok);
  })
  .catch(rej => {
    console.log(rej.error);
  })
}
else if(termMethod == 'mdLinks' && termPath && termValidate == '--stats') {
  mdLinks(termPath, termValidate)
  .then(res => {
    console.log(res.help);
  })
  .catch(rej => {
    console.log(rej.warn);
  })
}
else {
    console.log(`Error en parametros utilizados`.error);
};