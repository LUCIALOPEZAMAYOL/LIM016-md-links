// Devuelve cantidad de total de links
const totalLink = (arrayObjLinks) => arrayObjLinks.map((element) => (element.href)).length;

// Devuelve cantidad de links únicos
const uniqueLinks = (arrayObjLinks) => {
  const arrayLinks = arrayObjLinks.map((element) => element.href);
  return [...new Set(arrayLinks)].length;
};

// Devuelve cantidad de links rotos/inválidos
const brokenLinks = (arrayObjLinks) => arrayObjLinks.filter((element) => (element.ok === 'Fail')).length;

const help = `*************************************************** MD-LINKS ***************************************************************
        INSTRUCCIONES DE USO:

        1.Ingreso de ruta

        mdLinks <path> : 
        Debes ingresar una ruta absoluta o relativa
        Ejemplo: mdLinks("C:/Users/some/example.md")  ó  mdLinks("some/example.md")

        2. Interfaz de Línea de Comando (CLI)

        --validate    =>    mdLinks <path> --validate
        Mostrará el link (href), el texto que aparece dentro del link (text), 
        la ruta absoluta (file), Código de respuesta HTTP (status) y el Mensaje en caso de fallo o en caso de éxito. (ok).

        --stats => mdLinks <path> --stats
        Mostrará el total de links y los links únicos que encontró.

        --validate --stats ó --stats --validate   =>  mdLinks <path> --validate --stats     //  mdLinks <path> --stats --validate 
        Mostrará el total de links, unicos y rotos.

        *************************************************************************************************************************** `;

module.exports = {
  totalLink,
  uniqueLinks,
  brokenLinks,
  help,
};
