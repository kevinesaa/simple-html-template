# simple html template

Sólo clona este repositorio y editalo sin configuraciones o instalaciones adicionales.

Una plantilla simple para crear páginas web estáticas y sencillas, que pueden funcionar sin internet, sin frameworks y sin ninguna aplicación del lado del servidor como Apache, Nginx u otras similares, o al menos con la mínima cantidad de ellos.

Adicionalmente, está pensado para aquellas personas que están empezando, de manera tal que tengan un proyecto estructurado con el cúal iniciar.


## Contenido
- [Árbol de la aplicación](#application-tree)
- [¿Cómo ejecutar la aplicación?](#run-it)
- [¿Cómo contribuir en este repositorio?](#how-to-contribute-to-this-repository)
- [License](#license)
- [F.A.Q](#faq)

<a name="run-it"/> 

### ¿Cómo ejecutar la aplicación?

Arrastra y suelta el archivo index.html del directorio raíz hasta el navegador web.

<a name="application-tree"/> 

### Árbol de la aplicación

```
root 
├── buildTasks
├── dist
├── docs
│   ├── _assets
│   └── es
│       └── _assets
├── src
│   ├── __libs
│   │   ├── lib1
│   │   └── lib2
│   ├── _commons
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   │       ├── menu
│   │       ├── strings
│   │       │   └── es.js 
│   │       ├── external-routes.js
│   │       ├── images.js
│   │       ├── internal-routes.js
│   │       ├── PageLoader.js
│   │       ├── referencesIds.js
│   │       └── strings.js
│   ├── home
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   ├── js
│   │   │   ├── menu
│   │   │   ├── strings
│   │   │   │   └── es.js 
│   │   │   ├── external-routes.js
│   │   │   ├── images.js
│   │   │   ├── internal-routes.js
│   │   │   ├── referencesIds.js
│   │   │   └── strings.js
│   │   ├── home.js
│   │   └── index.html 
│   │
│   ├── page1
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   ├── js
│   │   │   ├── menu
│   │   │   ├── strings
│   │   │   │   └── es.js 
│   │   │   ├── external-routes.js
│   │   │   ├── images.js
│   │   │   ├── internal-routes.js
│   │   │   ├── referencesIds.js
│   │   │   └── strings.js
│   │   ├── page1.js
│   │   └── index.html 
│   │
│   └── page2
│       ├── css
│       ├── fonts
│       ├── img
│       ├── js
│       │   ├── menu
│       │   ├── strings
│       │   │   └── es.js 
│       │   ├── external-routes.js
│       │   ├── images.js
│       │   ├── internal-routes.js
│       │   ├── referencesIds.js
│       │   └── strings.js
│       ├── page2.js
│       └── index.html 
│
├── test
│   ├── buildTasks
│   │   ├── instrument
│   │   └── unit
│   └── src
│       ├── instrument
│       └── unit
├── index.html
└── main-index.js
```

#### Árbol de la aplicación detallado

- **buildTasks:** Si hay algún tipo scripts u otro tipo de artificio que pre-procese el código de `src` ó realice alguna otra tarea automatizada, cómo un validador de sintaxis, deberían de estar en este directorio.
- **dist:** Si hay algún pre-proceso que análise y modifique el código de `src`, el resultado de dichos procesos debería de estar en este directorio.
- **docs:** Todos los archivos necesarios para mantener documentado este repositorio.
 - **_assets:** Archivos binarios comunes entre todos los idiomas, cómo imágnes, vídeos, etc. que ayudan a mantener documentado este repositorio.
 - **_defaultLanguage:** Escoge el idioma principal de los archivos de documentación y guardalos en este directorio; En este caso el inglés es el idioma a usar por default.
 - **language code:** Si se desea traducir la documentación a otro idioma, agregar un nuevo directorio y nombralo siguiendo el [estándar ISO 639-1](https://es.wikipedia.org/wiki/ISO_639-1). En este caso el idioma español es usado cómo ejemplo principal.
   - **_assets:** Si hay algún recurso de `docs/_assets` que necesite ser traducido, se debería agregar a este directorio con el mismo nombre.
- **src:** El código fuente y los recursos de la página web. Ordenado en carpetas separadas por funcionalidades o módulos de páginas. Revisa la [documentación extendida para la carpeta src](extended-src.md) para saber más detalles sobre el contenido de esta carpeta.
 - **__libs:** Si hay librerías external para poder ejecutar el proyecto, se deben descargar y guardar en un directorio con el mismo nombre de la librería; Recuerda que este proyecto debe poder funcionar sin internet. No olvides revisar la licencia de la librería antes de agregarla al proyecto.
 - **_commons:** El código fuente y los recursos que son compartido entre dos ó más funcionalidades o módulos de páginas del sitio web.
 - **home:** El código fuente y los recursos de la página principal ó el punto de entrada del sitio web.
 - **page1:** Un ejemplo de un módulo de página.
- **tests:** El código fuente de los pruebas autómatizadas para prevenir bugs en el repositorio. Mientras más caso de prueba de calidad sean añadidos, más bugs pueden ser prevenidos, así que verifica tantas salidas esperadas por distintas entradas como sea posible. Ejecuta las pruebas automatizadas de agregar una nueva funcionalidad ó un nuevo parche. Revisa la [documentación extendida de la carpeta tests](extended-tests.md) para más detalles sobre el contenido de esta carpeta.
 - **buildTasks:** El código fuente de las pruebas automatizadas que verifica que los pre-preprocesadores del código que está en `src` funciona cómo se espera.
 - **src:** El código fuente de las pruebas automatizadas que verifican que el sitio web funciona cómo se espera.
- **index.html:** Si es necesario que la página principal de la aplicación esté en el directorio raíz, se puede usar este archivo para redirigir al usuario al punto de entra real del sitio web.
- **main-index.js:** Este script simpre de tiene que estar en el directorio raíz del proyecto y debe ser agregado a todos los archivos html, con el objectivo de poder generar la ruta absoluta de las urls internas, cuando la aplicación es ejecutada sin internet (`file:///`).

<a name="how-to-contribute-to-this-repository"/>

### ¿Cómo contribuir en este repositorio?

¿Quieres ayudar y colaborar? ¡Excelente! mira los detalles sobre los [lineamientos](CONTRIBUTING.md) a seguir para poder hacer pull request en este repositorio.

<a name="license"/>

### Licence
Todos los archivos de este repositorio están bajo la licencia **MIT No Attribution**. Ver más detalles de la licencia [aquí](../../LICENSE).

<a name="faq"/>

### F.A.Q

**¿Por qué no usas import en los archivos .js?**

Porque eso requiere que se use una aplicación del lado del servidor, Además de ser un inconveniente para las URLs de tipo `file:///`. [Más información sobre módulos en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules#otras_diferencias_entre_m%C3%B3dulos_y_scripts_est%C3%A1ndar) 
