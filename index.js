const {route, viewFolder, fileMDExtension, readFolder, regExp, extractionMDFiles, extractionLinks, dataLinks} = require ('./data');
const colors = require('colors');
colors.setTheme({
    info: ['green', 'bold', 'underline'],
    data: ['grey', 'bold', 'underline'],
    help: ['cyan', 'bold'],
    warn: ['yellow', 'bold'],
    debug: ['blue','bold'],
    error: ['red', 'bold', 'underline'],
});