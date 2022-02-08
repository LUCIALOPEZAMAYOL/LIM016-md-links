#!/usr/bin/env node
/* eslint-disable no-self-compare */
/* eslint-disable no-console */
const figlet = require('figlet');
const mdLinks = require('./index');
const {
  totalLink, uniqueLinks, brokenLinks, help,
} = require('./function-cli');

const [,, ...args] = process.argv;
const title = figlet.textSync('MD-LINKS', {
  font: 'Standard',
  horizontalLayout: 'full',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true,
});
console.log(title);

switch (args.length) {
  case 0:
    console.log('ingrese mdLinks <ruta> o ingrese mdLinks --help para obtener las instruciones');
    break;

  case 1:
    if (args[0] === '--help') {
      console.log(help);
    } else if (args[0] === args[0]) {
      mdLinks(args[0], { validate: false })
        .then((resolve) => resolve.forEach((element) => console.log(`${element.file} ${element.href} ${element.text} `)))
        .catch((error) => console.log(error));
    } else {
      console.log('La opción que está ingresando, no es válida');
    }
    break;

  case 2:
    if (args[1] === '--validate') {
      mdLinks(args[0], { validate: true })
        .then((resolve) => resolve.forEach((element) => console.log(`${element.file} ${element.href} ${element.text} ${element.status} ${element.ok}`)))
        .catch((error) => console.log(error));
    } else if (args[1] === '--stats') {
      mdLinks(args[0], { validate: true })
        .then((resolve) => console.log(`
        Total: ${totalLink(resolve)}
        Unique: ${uniqueLinks(resolve)}`))
        .catch((error) => console.log(error));
    } else {
      console.log('La opción que está ingresando, no es válida');
    }
    break;

  case 3:
    if ((args[1] === '--validate' && args[2] === '--stats') || (args[1] === '--stats' && args[2] === '--validate')) {
      mdLinks(args[0], { validate: true })
        .then((resolve) => console.log(`
        Total: ${totalLink(resolve)}
        Unique: ${uniqueLinks(resolve)}
        Broken: ${brokenLinks(resolve)}`))
        .catch((error) => console.log(error));
    } else {
      console.log('La opción que está ingresando, no es válida');
    }
    break;

  default:
    console.log('ninguno de los valores coincide con los parametros de ingreso');
    break;
}
