

const SITE_PREFIX = "my-site";
const STORE_USER_LANG = SITE_PREFIX + "_user-lang";

const PAGE_LOADER_URI = document.currentScript.src;
const PAGE_LOADER_PATH = PAGE_LOADER_URI.substring(0,PAGE_LOADER_URI.lastIndexOf("/"));
const COMMON_MODULE_DIRECTORY = PAGE_LOADER_PATH + "/..";

const USER_LANG = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage;
    

const DEFAULT_FILE_NAMES =  {
    referencesIds: "referencesIds.js",
    externalRoutes: "external-routes.js",
    internalRoutes: "internal-routes.js",
    images: "images.js",
    strings: "strings.js",
}

const DEFAULT_VAR_CONTAINER_NAMES = {
    referenceIds: "MODULE_REFERENCE_ID",
    externalRoutes: "MODULE_EXTERNAL_ROUTES",
    internalRoutes: "MODULE_INTERNAL_ROUTES",
    images: "MODULE_IMAGES",
    strings: "MODULE_STRINGS",
    locateStrings: "MODULE_LOCATE_STRINGS",
    commonReferenceIds: "COMMONS_REFERENCE_ID",
    commonExternalRoutes: "COMMONS_EXTERNAL_ROUTES",
    commonInternalRoutes: "COMMONS_INTERNAL_ROUTES",
    commonImages: "COMMONS_IMAGES",
    commonStrings: "COMMONS_STRINGS",
    commonLocateStrings: "COMMONS_LOCATE_STRINGS",
}

Object.freeze(DEFAULT_FILE_NAMES);
Object.freeze(DEFAULT_VAR_CONTAINER_NAMES);

class JsLoader {

    #document;
    #loadComplete;
    #loadFail;
    #scriptFileRoute;
    #containerVarName;
    #resource;
    #loadCompleteListener;
    #loadFailListener;

    constructor(doc, scriptRoute,containerVarName, loadCompletedListener, loadFailListener) {
        this.#document = doc;
        this.#scriptFileRoute = scriptRoute;
        this.#containerVarName = containerVarName;
        this.#loadCompleteListener = loadCompletedListener;
        this.#loadFailListener = loadFailListener;
        this.#loadComplete = false;
        this.#loadFail = false;
    }
    
    get myDocument() {
        return this.#document;
    }

    get myFileRoute() {
        return this.#scriptFileRoute;
    }
    
    get myLoadCompleted() {
        return this.#loadComplete;
    }

    get myLoadFail() {
        return this.#loadFail;
    }

    get myVarNameForLook() {
        return this.#containerVarName;
    }

    get myResource() {
        return this.#resource;
    }

    set myResource(resource) {
        this.#resource = resource;
    }
    
    set onCompletedListener(listener) {
        this.#loadCompleteListener = listener;
    }

    onCompleted() {
        this.#loadComplete = true;
        if(this.#loadCompleteListener) {
            this.#loadCompleteListener();
        }
    }
    
    onFail() {
        this.#loadFail = true;
        if(this.#loadFailListener) {
            this.#loadFailListener();
        }
    }

    loadScript() {
        JsLoader.scriptLoader(this.myDocument,this.myFileRoute, () => {
            this.myResource = eval(this.myVarNameForLook);
            this.onCompleted();
        }, this.onFail);
    }

    static scriptLoader(document, scriptRoute, onLoadCallback, onLoadFailCallback ) 
    {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptRoute;
        script.onload = function() {
            if(onLoadCallback) {
                onLoadCallback(script);
            }
        };
        script.onerror = function () {
            console.log("fail to load " + scriptRoute);
            if(onLoadFailCallback) {
                onLoadFailCallback();
            }
        };
        document.body.appendChild(script);
    }
}

class JsTextLoader extends JsLoader {
    
    #hasLocateText;
    #locateVarName;
    #locateRoute;
    #lang;

    constructor(doc, scriptRoute, defultcontainerVarName, hasLocateText, lang, locateVarName, locateFilePath, loadCompletedListener, loadFailListener)
    {
        super(doc, scriptRoute, defultcontainerVarName, loadCompletedListener, loadFailListener);
        this.#locateRoute = locateFilePath;
        this.#locateVarName = locateVarName;
        this.#hasLocateText = hasLocateText;
        this.#lang = lang;
    }

    get Language() {
        return this.#lang;
    }

    loadScript() {
        JsLoader.scriptLoader(this.myDocument,this.myFileRoute, () => {
            
            this.myResource = eval(this.myVarNameForLook);
            if(this.#hasLocateText) {
                this.loadLocateTexts();
            }
            else {
                this.onCompleted();
             }
        }, this.onFail);
    }

    loadLocateTexts() {

        JsLoader.scriptLoader(this.myDocument,this.#locateRoute,(langScriptElement) => {
            
            const a = eval(this.myVarNameForLook);
            const b = eval(this.#locateVarName);
            this.myResource = JsTextLoader.loadStringsHelper(a,b);
            this.myDocument.body.removeChild(langScriptElement);
            this.onCompleted();
        }, this.onFail);
    }

    static loadStringsHelper(defaultStrings,locateStrings) {
	
        const srcKeys = Object.keys(locateStrings);
        
        const strings = {};
        for(let i = 0; i < srcKeys.length; i++) {
          const key = srcKeys[i];
          strings[key] =  defaultStrings[key];
          if(locateStrings[key]) 
          {
            strings[key] = locateStrings[key];
          }
        }
        
        return strings;
    }
    
}

class JsInternalRouteLoader extends JsLoader {
    
    #rootPath;

    constructor(doc, scriptRoute,rootPath,containerVarName, loadCompletedListener, loadFailListener) {
        super(doc,scriptRoute,containerVarName,loadCompletedListener, loadFailListener);
        this.#rootPath = rootPath;
    }

    loadScript() {
        JsLoader.scriptLoader(this.myDocument,this.myFileRoute, () => {
            const internalPaths = eval(this.myVarNameForLook);
            this.myResource = JsInternalRouteLoader.loadInternalRoutesHelper(this.#rootPath,internalPaths);
            this.onCompleted();
        }, this.onFail);
    }
    
    static loadInternalRoutesHelper(deepPath,sourcesPaths) 
    {
        const srcKeys = Object.keys(sourcesPaths);
        
        const routes = {};
        for(let i = 0; i < srcKeys.length; i++) {
          const key = srcKeys[i];
          routes[key] = deepPath + sourcesPaths[key];
        }
        
        return routes;
    }
}

class PageModule {

    
    #loadCompletedListener;
    #loadFailedListener;
    
    #modulesToLoad;
    #myDocument;
    #stopIfOneFail;
    
    constructor(document) {

        this.#myDocument = document;
    }

    get StopIfOneFail() {
        return this.#stopIfOneFail;
    }

    set StopIfOneFail(stop) {
        this.#stopIfOneFail = stop;
    }


    loadPage() {
        const modules = this.#modulesToLoad;
        if(modules.length == 0) {
            if(this.#loadCompletedListener) {
                this.#loadCompletedListener();
            }
        }
        else {
            for(let i = 0; i < modules.length; i++) {

                modules[i].onCompletedListener = () => {this.checkLoadsAfterCompletedOne(modules);};
                modules[i].loadScript();
            }
        }
    }

    setModulesToLoad(modulesToLoad) {
        this.#modulesToLoad = modulesToLoad;
    }

    setOnLoadCompletedListener(onLoadCompleted) {
        this.#loadCompletedListener = onLoadCompleted;
    }

    setOnLoadFailListener(onFail) {
        this.#loadFailedListener = onFail;
    }

    checkLoadsAfterCompletedOne(modules) {
        
        const length = modules.length;
        const R = {};
        let completed = 0;
        
        for(let i = 0; i < length; i++) {
            const isLoaded = modules[i].myLoadCompleted;
            if(isLoaded) {
                completed++;
                const k = modules[i].myVarNameForLook;
                const v = modules[i].myResource;
                R[k] = v;
            }
        }
        
        if(completed >= length) {
            if(this.#loadCompletedListener) {
                
                this.#loadCompletedListener(Object.freeze(R));
            }
        }
    }
}

class PageModuleBuilder {
    
    #myDocument;
    #projectRootDirectory;
    #moduleDirectory;
    #stopIfOneFail;

    #properties = { 
        referencesId: { has: false, varContainer: undefined, path: undefined},
        externalRoutes: { has: false, varContainer: undefined, path: undefined},
        internalRoutes: { has: false, varContainer: undefined, path: undefined},
        images: { has: false, varContainer: undefined, path: undefined},
        strings: { has: false, varContainer: undefined, path: undefined},
        locateStrings: { has: false, varContainer: undefined, path: undefined, lang:undefined},
        
        commonReferencesId: { add: false, varContainer: undefined, path: undefined},
        commonExternalRoutes: { add: false, varContainer: undefined, path: undefined},
        commonInternalRoutes: { add: false, varContainer: undefined, path: undefined},
        commonImages: { add: false, varContainer: undefined, path: undefined},
        commonStrings: { add: false, varContainer: undefined, path: undefined},
        commonLocateStrings: { add: false, varContainer: undefined, path: undefined, lang:undefined},
    };

    constructor(document, mainScriptPath, modulePath) {
        
        this.#projectRootDirectory = mainScriptPath;
        this.#moduleDirectory = modulePath;
        this.#myDocument = document;
        this.#stopIfOneFail = false;
    }

    get moduleUri() {
        
        let uri;
        if(this.#moduleDirectory) {
            uri = this.#moduleDirectory;
        }
        else {
            const myDocumentUri = this.#myDocument.location.pathname;
            uri = myDocumentUri.substring(0,myDocumentUri.lastIndexOf("/"));
        }
        
        return uri;
    }
    

    build(onLoadCompletedListener, loadFailedListener) {
        
        const doc =  this.#myDocument ?  this.#myDocument : document;
        const module = this.moduleUri + "/js";
        const commonModule = PAGE_LOADER_PATH;
        const pageModule = new PageModule(doc);
        pageModule.setOnLoadCompletedListener(onLoadCompletedListener);
        pageModule.setOnLoadFailListener(loadFailedListener);
        const modulesToLoad = [];
        
        if(this.#properties.referencesId.has) {
            const varName = this.#properties.referencesId.varContainer ? this.#properties.referencesId.varContainer : DEFAULT_VAR_CONTAINER_NAMES.referenceIds;
            const scriptFile = this.#properties.referencesId.path ? this.#properties.referencesId.path : module + "/" + DEFAULT_FILE_NAMES.referencesIds;
            const referencesIds = new JsLoader(doc,scriptFile,varName);
            modulesToLoad.push(referencesIds);
        }

        if(this.#properties.externalRoutes.has) {
            const varName = this.#properties.externalRoutes.varContainer ? this.#properties.externalRoutes.varContainer : DEFAULT_VAR_CONTAINER_NAMES.externalRoutes;
            const scriptFile = this.#properties.externalRoutes.path ? this.#properties.externalRoutes.path : module + "/" + DEFAULT_FILE_NAMES.externalRoutes;
            const externalRoutes = new JsLoader(doc,scriptFile,varName);
            modulesToLoad.push(externalRoutes);
        }

        if(this.#properties.internalRoutes.has) {
            const varName = this.#properties.internalRoutes.varContainer ? this.#properties.internalRoutes.varContainer : DEFAULT_VAR_CONTAINER_NAMES.internalRoutes;
            const scriptFile = this.#properties.internalRoutes.path ? this.#properties.internalRoutes.path : module + "/" + DEFAULT_FILE_NAMES.internalRoutes;
            const internalRoutes = new JsInternalRouteLoader(doc,scriptFile,this.#projectRootDirectory,varName);
            modulesToLoad.push(internalRoutes);
        }

        if(this.#properties.images.has) {
            const varName = this.#properties.images.varContainer ? this.#properties.images.varContainer : DEFAULT_VAR_CONTAINER_NAMES.images;
            const scriptFile = this.#properties.images.path ? this.#properties.images.path : module + "/" + DEFAULT_FILE_NAMES.images;
            const images = new JsInternalRouteLoader(doc,scriptFile,this.#projectRootDirectory,varName);
            modulesToLoad.push(images);
        }

        if(this.#properties.strings.has) {
            
            let hasLocateText = this.#properties.locateStrings.has;
            let lang = undefined;
            let locateVarName = undefined;
            let locateFilePath = undefined;
            if(hasLocateText) {
                lang = this.#properties.locateStrings.lang ? this.#properties.locateStrings.lang : USER_LANG.substring(0,2);
                locateVarName = this.#properties.locateStrings.varContainer ? this.#properties.locateStrings.varContainer : DEFAULT_VAR_CONTAINER_NAMES.locateStrings;
                locateFilePath = this.#properties.locateStrings.path ? this.#properties.locateStrings.path : module + "/strings/" + lang.substring(0,2)+".js";
            }
            
            const varName = this.#properties.strings.varContainer ? this.#properties.strings.varContainer : DEFAULT_VAR_CONTAINER_NAMES.strings;
            const scriptFile = this.#properties.strings.path ? this.#properties.strings.path : module + "/" + DEFAULT_FILE_NAMES.strings;
            const strings = new JsTextLoader(doc,scriptFile,varName,hasLocateText,lang,locateVarName,locateFilePath);
            modulesToLoad.push(strings);
        }

        if(this.#properties.commonReferencesId.add) {
            const varName = this.#properties.commonReferencesId.varContainer ? this.#properties.commonReferencesId.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonReferenceIds;
            const scriptFile = this.#properties.commonReferencesId.path ? this.#properties.commonReferencesId.path : commonModule + "/" + DEFAULT_FILE_NAMES.referencesIds;
            const commonReferencesIds = new JsLoader(doc,scriptFile,varName);
            modulesToLoad.push(commonReferencesIds);
        }

        if(this.#properties.commonExternalRoutes.add) {
            const varName = this.#properties.commonExternalRoutes.varContainer ? this.#properties.commonExternalRoutes.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonExternalRoutes;
            const scriptFile = this.#properties.commonExternalRoutes.path ? this.#properties.commonExternalRoutes.path : commonModule + "/" + DEFAULT_FILE_NAMES.externalRoutes;
            const commonExternalRoutes = new JsLoader(doc,scriptFile,varName);
            modulesToLoad.push(commonExternalRoutes);
        }

        if(this.#properties.commonInternalRoutes.add) {
            const varName = this.#properties.commonInternalRoutes.varContainer ? this.#properties.commonInternalRoutes.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonInternalRoutes;
            const scriptFile = this.#properties.commonInternalRoutes.path ? this.#properties.commonInternalRoutes.path : commonModule + "/" + DEFAULT_FILE_NAMES.internalRoutes;
            const commonInternalRoutes = new JsInternalRouteLoader(doc,scriptFile,this.#projectRootDirectory,varName);
            modulesToLoad.push(commonInternalRoutes);
        }

        if(this.#properties.commonImages.add) {
            const varName = this.#properties.commonImages.varContainer ? this.#properties.commonImages.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonImages;
            const scriptFile = this.#properties.commonImages.path ? this.#properties.commonImages.path : commonModule + "/" + DEFAULT_FILE_NAMES.images;
            const commonImages = new JsInternalRouteLoader(doc,scriptFile,this.#projectRootDirectory,varName);
            modulesToLoad.push(commonImages);
        }

        if(this.#properties.commonStrings.add) {
            
            let hasLocateText = this.#properties.commonLocateStrings.add;
            let lang = undefined;
            let locateVarName = undefined;
            let locateFilePath = undefined;
            if(hasLocateText) {
                lang = this.#properties.commonLocateStrings.lang ? this.#properties.commonLocateStrings.lang : USER_LANG.substring(0,2);
                locateVarName = this.#properties.commonLocateStrings.varContainer ? this.#properties.commonLocateStrings.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonLocateStrings;
                locateFilePath = this.#properties.commonLocateStrings.path ? this.#properties.commonLocateStrings.path : commonModule + "/strings/" + lang.substring(0,2)+".js";
            }
            
            const varName = this.#properties.commonStrings.varContainer ? this.#properties.commonStrings.varContainer : DEFAULT_VAR_CONTAINER_NAMES.commonStrings;
            const scriptFile = this.#properties.commonStrings.path ? this.#properties.commonStrings.path : commonModule + "/" + DEFAULT_FILE_NAMES.strings;
            const strings = new JsTextLoader(doc,scriptFile,varName,hasLocateText,lang,locateVarName,locateFilePath);
            modulesToLoad.push(strings);
        }

        pageModule.setModulesToLoad(modulesToLoad);
        return pageModule;
    }

    setHasReferencesId(isHas, varNameContainer, filePath) {
        
        this.#properties.referencesId.has = isHas;
        this.#properties.referencesId.varContainer = varNameContainer;
        this.#properties.referencesId.path = filePath;
        return this;
    }

    setHasExternalRoutes(isHas, varNameContainer, filePath) {
        
        this.#properties.externalRoutes.has = isHas;
        this.#properties.externalRoutes.varContainer = varNameContainer;
        this.#properties.externalRoutes.path = filePath;
        return this;
    }

    setHasInternalRoutes(isHas, varNameContainer, filePath) {
        
        this.#properties.internalRoutes.has = isHas;
        this.#properties.internalRoutes.varContainer = varNameContainer;
        this.#properties.internalRoutes.path = filePath;
        return this;
    }

    setHasImages(isHas, varNameContainer, filePath) {
        
        this.#properties.images.has = isHas;
        this.#properties.images.varContainer = varNameContainer;
        this.#properties.images.path = filePath;
        return this;
    }

    setHasStrings(isHas, varNameContainer, filePath) {
        
        this.#properties.strings.has = isHas;
        this.#properties.strings.varContainer = varNameContainer;
        this.#properties.strings.path = filePath;
        return this;
    }

    setHasLocateStrings(isHas, lang, varNameContainer, filePath) {
        
        this.#properties.locateStrings.has = isHas;
        this.#properties.locateStrings.lang = lang;
        this.#properties.locateStrings.varContainer = varNameContainer;
        this.#properties.locateStrings.path = filePath;
        return this;
    }

    addCommonReferencesId(add, varNameContainer, filePath) {

        this.#properties.commonReferencesId.add = add;
        this.#properties.commonReferencesId.varContainer = varNameContainer;
        this.#properties.commonReferencesId.path = filePath;
        return this;
    }

    addCommonExternalRoutes(add, varNameContainer, filePath) {

        this.#properties.commonExternalRoutes.add = add;
        this.#properties.commonExternalRoutes.varContainer = varNameContainer;
        this.#properties.commonExternalRoutes.path = filePath;
        return this;
    }
    
    addCommonInternalRoutes(add, varNameContainer, filePath) {

        this.#properties.commonInternalRoutes.add = add;
        this.#properties.commonInternalRoutes.varContainer = varNameContainer;
        this.#properties.commonInternalRoutes.path = filePath;
        return this;
    }
    
    addCommonImages(add, varNameContainer, filePath) {

        this.#properties.commonImages.add = add;
        this.#properties.commonImages.varContainer = varNameContainer;
        this.#properties.commonImages.path = filePath;
        return this;
    }
    
    addCommonStrings(add, varNameContainer, filePath) {
        
        this.#properties.commonStrings.add = add;
        this.#properties.commonStrings.varContainer = varNameContainer;
        this.#properties.commonStrings.path = filePath;
        return this;
    }
    
    addCommonLocateStrings(add, lang, varNameContainer, filePath) {
        
        this.#properties.commonLocateStrings.add = add;
        this.#properties.commonLocateStrings.lang = lang;
        this.#properties.commonLocateStrings.varContainer = varNameContainer;
        this.#properties.commonLocateStrings.path = filePath;
        return this;
    }
    
}