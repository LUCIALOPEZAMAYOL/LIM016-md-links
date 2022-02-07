const api = require('./api.js');

const mdLinks = (path, options={validate:false})=>{
  return new Promise((resolve, reject)=>{
    if(path===undefined || path===''){
      reject('se requiere <path>');
    }
    let rutaAbsoluta = api.convertirRuta(path);
    let validarExistenciaRuta=api.rutaExistente(rutaAbsoluta);
    
    if(validarExistenciaRuta){
      let arrayRutaArchivosMd= api.obtenerArchivosMd(rutaAbsoluta);
      
      if (arrayRutaArchivosMd.length>0){
        let arrayLinks=api.obtenerLinks(arrayRutaArchivosMd);
        if(arrayLinks.length>0){
          let arrayObjLink=api.validarLinks(arrayLinks);
          if(options.validate){
            resolve(arrayObjLink).then((resolve)=>resolve);
          }else{
            resolve(arrayLinks);
          }
        }else {
          reject('No se encontraron links')
        }
      }else{
        reject('No se encontraron archivos md')
      }
    }else{
      reject(`La ruta ${rutaAbsoluta} no existe`);
    }
  })
};

module.exports =  mdLinks;