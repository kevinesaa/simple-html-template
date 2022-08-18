# simple html template

Sólo clona este repositorio y editalo sin configuraciones o instalaciones adicionales.

Una plantilla simple para crear páginas web estáticas y sencillas, que pueden funcionar sin internet, sin frameworks y sin ninguna aplicación del lado del servidor como Apache, Nginx u otras similares, o al menos con la mínima cantidad de ellos.

Adicionalmente, está pensado para aquellas personas que están empezando, de manera tal que tengan un proyecto estructurado con el cúal iniciar.


## Contenido
- [Árbol de la aplicación](#application-tree)
- [¿Cómo contribuir en este repositorio?](#how-to-contribute-to-this-repository)
- [License](#license)
- [F.A.Q](#faq)


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
