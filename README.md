[You do not know english, look for others languages](languages.md)

# simple html template

Just clone and edit without settings or extra installations.

A simple template to create simple statics web pages, which can work without internet, without frameworks and without any server-side applications such as Apache, Nginx or other similar, or at least with the minimum of them.

Also, this is made for those who are just starting out, they may have something to start with a structured project.


## contents
- [Application tree](#application-tree)
- [How run it?](#run-it)
- [How to contribute to this repository?](#how-to-contribute-to-this-repository)
- [License](#license)
- [F.A.Q](#faq)


<a name="run-it"/> 

### How run it?

Drag and drop the index.html from the root directory to the web browser.

<a name="application-tree"/> 

### Application tree

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
#### Application tree details

- **buildTasks:** If there are any scripts or other automation artifacts that pre-process the `src` code or do any other automation task, such as a syntax validator, they should be in this directory.
- **dist:** If there is a pre-process that analyzes and modify the `src` code, the result after pre-process should be in this directory
- **docs:** All the files needed to maintain this repository documented.
 - **_assets:** Common binary files amoung languages, like images, videos, etc. that help to keep documented this repository.
 - **_defaultLanguage:** Choose the main language of the documentation files and save it in this directory; In this case english it is the default language.
 - **language code:** If you want to translate the documentation to another language, add a directory and named it following the [ISO 639-1 standard](https://en.wikipedia.org/wiki/ISO_639-1). In this case spanish (es) it is used as main example.
   - **_assets:** If there is some assets from `docs/_assets` that need to be translate, should be in this directory with the same name.
- **src:** The source code and assets of the web site. Ordered in folders separate by features or pages' modules. Check the [extended src folder documentation](docs/_defaultLanguage/extended-src.md) for more details about what contain this folder.
 - **__libs:** If there are external libraries to run the project, they must be downloaded and saved it in a directory that should be named with the library name; Remember that this project should be work without Internet. Do not forget check the library's license before add it to the project.
 - **_commons:** The source code and assets that is share amoung two or more features or pages' modules.
 - **home:** The source code and assets of home page or entry point of the web site.
 - **page1:** A example of a page module.
- **tests:** The source code of the automatation tests to prevent bugs in this repository. As more quality test cases are added, more bugs will be prevented, so check as many expected outputs for different inputs as possible. Check the [extended test folder documentation](docs/_defaultLanguage/extended-tests.md) for more details about what contain this folder.
 - **buildTasks:** The source code of the automation tests for check that the src's pre-process works as expected.
 - **src:** The source code of the automation tests for check that the code from the web site works as expected.
- **index.html:** If the app need that the home page will be in the root folder, use this to redirect to real entry point of the web page.
- **main-index.js:** This script always have to be in the root directory of the project and have to be add to all the html files, in orden to build the absolute path of internal urls' when is execute it without internet (`file:///`).

<a name="how-to-contribute-to-this-repository"/>

### How to contribute to this repository?

Do you want to help us? Excellent! Take a look at the [guidelines](CONTRIBUTING.md) to follow to be able to make a pull request to this repository.

<a name="license"/>

### Licence
All files in this repository are licensed under the **MIT No Attribution** license. See more license details [here](LICENSE).

<a name="faq"/>

### F.A.Q

**Why don't you use import in the .js files?**

Because it that requires a server-side application, Also, it is a Issue for the type of `file:///` URLs. [More information about JavaScript's modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts) 
