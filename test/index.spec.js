const mdLinks = require('../src/index');
let rutaValida='E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioPadre';
let rutaRelativa='src';
let rutaInexistente= 'E:/directorioPadre5';
let rutaSinMd='E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioSinMd';
let rutaMdSinLinks='E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioMdSinLink';

let arrObjLinksFalse= [
  {
    href: 'about:blank#1-pre%C3%A1mbulo',
    text: '1. Preámbulo',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Marwn',
    text: 'Markdown',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md'
  }
];

  let arrObjLinksTrue= [
    {
      href: 'about:blank#1-pre%C3%A1mbulo',
      text: '1. Preámbulo',
      file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
      status: 'Failed Status',
      ok: 'Fail'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md',
      status: 200,
      ok: 'Ok'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Marwn',
      text: 'Markdown',
      file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md',
      status: 404,
      ok: 'Fail'
    }];

describe('mdLinks', () => {

  it('Es una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debe retornar un mensaje donde advierte que la ruta no existe', () =>{
    expect.assertions(1);
    return mdLinks(rutaInexistente, {validate:true}).catch(e=>expect(e).toMatch(`La ruta ${rutaInexistente} no existe`))
  });

  it('Debe convertir una ruta relativa a absoluta y devolver su valor', () =>{
    expect.assertions(1);
    return mdLinks(rutaRelativa, {validate:true}).catch(e=>expect(e).toMatch('No se encontraron archivos md'))
  });

  it('Debe retornar un mensaje donde advierte que no se encontraton archivos .md', () =>{
    expect.assertions(1);
    return mdLinks(rutaSinMd, {validate:true}).catch(e=>expect(e).toMatch('No se encontraron archivos md'))
  });

  it('Debe retornar un mensaje donde advierte que no se encontraron links en archivos md', () =>{
    expect.assertions(1);
    return mdLinks(rutaMdSinLinks, {validate:true}).catch(e=>expect(e).toMatch('No se encontraron links'))
  });

  it('Debe retornar una arreglo [{ href, text, file }, ...] cuando el validate es false', ()=>{
    return mdLinks(rutaValida, {validate:false}).then(res=>{
      expect(res[0]).toEqual(arrObjLinksFalse[0]);
    })
  });

  it('Debe retornar una arreglo [{ href, text, file, status, ok }, ...] cuando el validate es true', ()=>{
    return mdLinks(rutaValida, {validate:true}).then(res=>{
      expect(res[0]).toEqual(arrObjLinksTrue[0]);
    })
  });

  it('Debe validar el ingreso de parametro <path> undefined', ()=>{
    expect.assertions(1);
    return mdLinks().catch(e=>expect(e).toMatch('se requiere <path>'))
  });

  ('Debe validar el ingreso de parametro <path> vacío', ()=>{
    expect.assertions(1);
    return mdLinks('',{validate:true}).catch(e=>expect(e).toMatch('se requiere <path>'))
  });
});