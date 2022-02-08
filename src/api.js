const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const fetch = require('node-fetch');

// validar ruta absoluta
const convertirRuta = (ruta) => (path.isAbsolute(ruta) ? ruta : path.resolve(ruta));

// validar existencia de una ruta
const rutaExistente = (ruta) => fs.existsSync(ruta);

// validar si es directorio
const esDirectorio = (ruta) => fs.statSync(ruta).isDirectory();

// Leer contenido de directorio
const obetenerContenidoDirectorio = (directorio) => fs.readdirSync(directorio);

// Validar si el archivo tiene extension .md
const esArchivoMd = (archivo) => (path.extname(archivo) === '.md');

// Función que retorna un array de todos los archivos .md de un directorio
const obtenerArchivosMd = (ruta) => {
  let arregloArchivosMd = [];
  if (esDirectorio(ruta)) {
    const contenidoDirectorio = obetenerContenidoDirectorio(ruta);
    contenidoDirectorio.forEach((archivo) => {
      const obtenerRutaAbsoluta = path.join(ruta, archivo);
      if (esDirectorio(obtenerRutaAbsoluta)) {
        arregloArchivosMd = arregloArchivosMd.concat(obtenerArchivosMd(obtenerRutaAbsoluta));
      } else if (esArchivoMd(obtenerRutaAbsoluta)) {
        arregloArchivosMd.push(obtenerRutaAbsoluta);
      }
    });
  } else if (esArchivoMd(ruta)) {
    arregloArchivosMd.push(ruta);
  }
  return arregloArchivosMd;
};

// Funcion que devuelve un array con los link contenidos en los archivos .md
const obtenerLinks = (arrayRutaArchivoMd) => {
  const arregloLinks = [];
  arrayRutaArchivoMd.forEach((rutaArchivoMd) => {
    const leerContenidoArchivo = fs.readFileSync(rutaArchivoMd, 'utf-8');
    const archivoFormatoHtml = md.render(leerContenidoArchivo);
    const arrayNodos = new JSDOM(archivoFormatoHtml).window.document.querySelectorAll('a');
    arrayNodos.forEach((etiqueta) => {
      arregloLinks.push({
        href: etiqueta.href,
        text: (etiqueta.textContent).slice(0, 50),
        file: rutaArchivoMd,
      });
    });
  });
  return arregloLinks;
};

// Funcion para validar los links
const validarLinks = (objLinks) => {
  const array = objLinks.map((element) => fetch(element.href)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return {
          href: element.href,
          text: element.text,
          file: element.file,
          status: response.status,
          ok: 'Ok',
        };
      }
      return {
        href: element.href,
        text: element.text,
        file: element.file,
        status: response.status,
        ok: 'Fail',
      };
    })
    .catch(() => ({
      href: element.href,
      text: element.text,
      file: element.file,
      status: 'Failed Status',
      ok: 'Fail',
    })));
  return Promise.all(array);
};

module.exports = {
  convertirRuta,
  rutaExistente,
  esDirectorio,
  esArchivoMd,
  obtenerArchivosMd,
  obtenerLinks,
  validarLinks,
};
