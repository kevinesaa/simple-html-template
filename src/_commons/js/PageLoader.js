

const SITE_PREFIX = "my-site";
const STORE_USER_LANG = SITE_PREFIX + "_user-lang";

const PAGE_LOADER_URI = document.currentScript.src;
const PAGE_LOADER_PATH = PAGE_LOADER_URI.substring(0,PAGE_LOADER_URI.lastIndexOf("/"));

const MY_URI = window.location.pathname;
const MY_MODULE_URI = MY_URI.substring(0,MY_URI.lastIndexOf("/"));
const MY_MODULE_NAME = MY_URI.substring( MY_URI.substring(0,MY_URI.lastIndexOf("/")+1).lastIndexOf("/")+1, MY_URI.lastIndexOf("/"));

const USER_LANG = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage;
    

const FILE_NAMES =  {
    referencesIds:"referencesIds.js",
    externalRoutes:"external-routes.js",
    internalRoutes:"internal-routes.js",
    images:"images.js",
    strings:"strings.js",
}

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

class JsTextLoader extends JsLoader{
    
    #hasLocateText;
    #locateVarName;
    #locateRoute;

    constructor(doc, scriptRoute, defultcontainerVarName, hasLocateText, lang, locateVarName, loadCompletedListener, loadFailListener)
    {
        super(doc,scriptRoute,defultcontainerVarName,loadCompletedListener, loadFailListener);
        const path = this.myFileRoute.substring(0,this.myFileRoute.lastIndexOf("/") + 1);
        this.#locateRoute = path + "strings/" + lang + ".js";
        this.#locateVarName = locateVarName;
        this.#hasLocateText = hasLocateText;
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
    
    constructor(document) {

        this.#myDocument = document;
    }

    loadPage() {
        if(this.#modulesToLoad.length == 0) {
            if(this.#loadCompletedListener) {
                this.#loadCompletedListener();
            }
        }
        else {
            for(let i = 0; i < this.#modulesToLoad.length; i++) {
                this.#modulesToLoad[i].onCompletedListener = this.checkLoads;
                this.#modulesToLoad[i].loadScript();
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

    checkLoads() {
        console.log("hola");
    }
}

class PageModuleBuilder {
    
    #myDocument;
    #projectRootDirectory;
    #moduleDirectory;

    #properties = { referencesId: { has: false, varContainer:undefined,path:undefined}
    };

    constructor(document, mainScriptPath, modulePath) {
        
        this.#projectRootDirectory = mainScriptPath;
        this.#moduleDirectory = modulePath;
        this.#myDocument = document;
        
    }

    build(onLoadCompletedListener,loadFailedListener) {

        const doc =  this.#myDocument ?  this.#myDocument : document;
        const module = this.#moduleDirectory ? this.#moduleDirectory : MY_MODULE_URI + "/js";
        const pageModule = new PageModule(doc);
        const modulesToLoad = [];
        if(this.#properties.referencesId.has) {
            const varName = this.#properties.referencesId.varContainer ? this.#properties.referencesId.varContainer : "REFERENCE_ID";
            const scriptFile = this.#properties.referencesId.path ? this.#properties.referencesId.path : module + "/" + FILE_NAMES.referencesIds;
            const referencesIds = new JsLoader(doc,scriptFile,varName);
            modulesToLoad.push(referencesIds);
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

    setHasInternalRoutes(isHas){
        
        return this;
    }
    
    setHasExternalRoutes(isHas){
        
        return this;
    }

    setHasStrings(isHas){
        
        return this;
    }

    setHasImages(isHas){
        
        return this;
    }

    setHasLocateStrings(isHas) {
        
        return this;
    }

    addCommonReferencesId(add) {

        return this;
    }
    

    addCommonExternalRoutes(add) {

        return this;
    }
    
    addCommonInternalRoutes(add) {

        return this;
    }
    
    addCommonImages(add) {

        return this;
    }
    
    addCommonStrings(add) {
        
        return this;
    }
    
    addCommonLocateStrings(add) {
        
        return this;
    }
    
}