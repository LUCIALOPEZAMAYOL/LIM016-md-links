/* eslint-disable linebreak-style */
const mdLinks = require('../src/index');

const rutaValida = 'E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioPadre';
const rutaRelativa = 'src';
const rutaInexistente = 'E:/directorioPadre5';
const rutaSinMd = 'E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioSinMd';
const rutaMdSinLinks = 'E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioMdSinLink';
const rutaArchivoOtro = 'E:/LABORATORIA/PROYECTOS/MD-LINKS/LIM016-md-links/PRUEBA_MdLinks/directorioPadre/archivo1.txt';
const rutaArchivosMd = 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md';

const arrObjLinksFalse = [
  {
    href: 'about:blank#1-pre%C3%A1mbulo',
    text: '1. Preámbulo',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Marwn',
    text: 'Markdown',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\src\\archivomd3.md',
  },
];

const arrObjLinksTrue = [
  {
    href: 'about:blank#1-pre%C3%A1mbulo',
    text: '1. Preámbulo',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
    status: 'Failed Status',
    ok: 'Fail',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Marwn',
    text: 'Markdown',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd2.md',
    status: 404,
    ok: 'Fail',
  },
  {
    href: 'https://developers.google.com/v8/',
    text: 'motor de JavaScript V8 de Chrome',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\src\\archivomd3.md',
    status: 200,
    ok: 'Ok',
  },
];

const arrObjLinksArchivoMd = [
  {
    href: 'about:blank#1-pre%C3%A1mbulo',
    text: '1. Preámbulo',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
    status: 'Failed Status',
    ok: 'Fail',
  },
  {
    href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
    text: 'cifrado César',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
    status: 200,
    ok: 'Ok',
  },
];

const arrObjLinksArchivoMdFalse = [
  {
    href: 'about:blank#1-pre%C3%A1mbulo',
    text: '1. Preámbulo',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
  },
  {
    href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
    text: 'cifrado César',
    file: 'E:\\LABORATORIA\\PROYECTOS\\MD-LINKS\\LIM016-md-links\\PRUEBA_MdLinks\\directorioPadre\\archivomd1.md',
  },
];

describe('mdLinks', () => {
  it('Es una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Debe retornar un mensaje donde advierte que la ruta no existe', () => {
    expect.assertions(1);
    return mdLinks(rutaInexistente, { validate: true }).catch((e) => expect(e).toMatch(`La ruta ${rutaInexistente} no existe`));
  });

  it('Debe convertir una ruta relativa a absoluta y devolver su valor', () => {
    expect.assertions(1);
    return mdLinks(rutaRelativa, { validate: true }).catch((e) => expect(e).toMatch('No se encontraron archivos md'));
  });

  it('Debe retornar un mensaje donde advierte que no se encontraton archivos .md', () => {
    expect.assertions(1);
    return mdLinks(rutaSinMd, { validate: true }).catch((e) => expect(e).toMatch('No se encontraron archivos md'));
  });

  it('Debe retornar un mensaje donde advierte que no se encontraton archivos .md', () => {
    expect.assertions(1);
    return mdLinks(rutaArchivoOtro, { validate: true }).catch((e) => expect(e).toMatch('No se encontraron archivos md'));
  });

  it('Debe retornar un mensaje donde advierte que no se encontraron links en archivos md', () => {
    expect.assertions(1);
    return mdLinks(rutaMdSinLinks, { validate: true }).catch((e) => expect(e).toMatch('No se encontraron links'));
  });

  it('Debe retornar una arreglo [{ href, text, file }, ...] cuando el validate es false', () => mdLinks(rutaValida, { validate: false }).then((res) => {
    expect(res[0]).toEqual(arrObjLinksFalse[0]);
  }));

  it('Debe retornar una arreglo [{ href, text, file, status, ok }, ...] cuando el validate es true', () => mdLinks(rutaValida, { validate: true }).then((res) => {
    expect(res[0]).toEqual(arrObjLinksTrue[0]);
  }));

  it('Debe retornar una arreglo [{ href, text, file }, ...] cuando el validate es false', () => mdLinks(rutaArchivosMd, { validate: false }).then((res) => {
    expect(res[0]).toEqual(arrObjLinksArchivoMdFalse[0]);
  }));

  it('Debe retornar una arreglo [{ href, text, file, status, ok }, ...] cuando el validate es true', () => mdLinks(rutaArchivosMd, { validate: true }).then((res) => {
    expect(res[0]).toEqual(arrObjLinksArchivoMd[0]);
  }));

  it('Debe validar el ingreso de parametro <path> undefined', () => {
    expect.assertions(1);
    return mdLinks().catch((e) => expect(e).toMatch('se requiere <path>'));
  });

  it('Debe validar el ingreso de parametro <path> vacío', () => {
    expect.assertions(1);
    return mdLinks('', { validate: true }).catch((e) => expect(e).toMatch('se requiere <path>'));
  });

  it('Debe validar el ingreso de parametro <path> undefined', () => {
    expect.assertions(1);
    return mdLinks(undefined, { validate: true }).catch((e) => expect(e).toMatch('se requiere <path>'));
  });
});
