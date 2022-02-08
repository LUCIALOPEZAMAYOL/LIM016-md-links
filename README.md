# MARKDOW LINKS

### 1) DESCRIPCIÓN

Es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio.

mdLink es una librería que te permite leer el sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,hacer consultas HTTP.

### 2) DOCUMENTACIÓN

#### 2.1) INSTALACIÓN 

Para poder instalar la libería ejecuta en la terminal:

#### 2.2)GUÍA DE USO

`const mdL = require('mdLinks')`

##### API

Para ejecutar la librería utiliza el siguiente comando:

`$ mdLinks`
En caso que no llegase a responder la ejecucuión ingresa:

`npm link`

Función mdLinks:

`mdLinks (path, options)`

###### ARGUMENTOS
* `path`: Ruta absoluta o relativa.
* `options`: Un objeto con únicamente la propiedad de `valiadte`, que viene a ser un booleano, que determina si deseas validar los links encontrados.

##### CLI (Command Line Interface - Interfaz de Línea de Comando)

Después de ejecutar la librería conoce las lineas de comando para los demás usos:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

* `mdLinks <path>`
Al ejecutar esta línea de comando **retornará unua promesa** que **resuelva a un arreglo**(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene las siguientes propiedades:

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

* `mdLinks --help`
 Al ejecutar esta línea de comando retornará las instrucciones de todas las líneas de comando que se usaran para la librería.

* `mdLinks <path> --validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
* `mdLinks <path> `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
* `mdLinks <path>` `--stats --validate` ó `--validate --stats`

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
### 3) Diagrama de flujo

#### DIAGRAMA API
![Diagrama_Api](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)