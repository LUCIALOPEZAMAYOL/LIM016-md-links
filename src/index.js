/* eslint-disable no-shadow */
/* eslint-disable prefer-promise-reject-errors */
const api = require('./api');

const mdLinks = (path, options = { validate: false }) => new Promise((resolve, reject) => {
  if (path === undefined || path === '') {
    reject('se requiere <path>');
  }
  const rutaAbsoluta = api.convertirRuta(path);
  const validarExistenciaRuta = api.rutaExistente(rutaAbsoluta);

  if (validarExistenciaRuta) {
    const arrayRutaArchivosMd = api.obtenerArchivosMd(rutaAbsoluta);

    if (arrayRutaArchivosMd.length > 0) {
      const arrayLinks = api.obtenerLinks(arrayRutaArchivosMd);
      if (arrayLinks.length > 0) {
        const arrayObjLink = api.validarLinks(arrayLinks);
        if (options.validate) {
          resolve(arrayObjLink).then((resolve) => resolve);
        } else {
          resolve(arrayLinks);
        }
      } else {
        reject('No se encontraron links');
      }
    } else {
      reject('No se encontraron archivos md');
    }
  } else {
    reject(`La ruta ${rutaAbsoluta} no existe`);
  }
});

module.exports = mdLinks;
