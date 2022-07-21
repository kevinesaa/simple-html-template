

const SITE_PREFIX = "my-site";
const STORE_USER_LANG = SITE_PREFIX + "_user-lang";

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

    set myLoadCompleted(completed) {
        this.#loadComplete = completed;
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

    onCompleted() {
        if(this.#loadCompleteListener) {
            this.#loadCompleteListener();
        }
    }
    
    onFail() {
        if(this.#loadFailListener) {
            this.#loadFailListener();
        }
    }

    loadScript() {
        JsLoader.scriptLoader(this.myDocument,this.myFileRoute, () => {
            this.myResource = eval(this.myVarNameForLook);
            this.myLoadCompleted = true;
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
                this.myLoadCompleted = true;
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
            this.myLoadCompleted = true;
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
            this.myLoadCompleted = true;
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
    
    #myDocument;
    
    constructor(document) {
        
        
        
        this.#myDocument = document;
    }

    setHasReferencesId(isHas) {
        
    }

    setHasInternalRoutes(isHas){
        
    }
    
    setHasExternalRoutes(isHas){
        
    }

    setHasStrings(isHas){
        
    }

    setHasImages(isHas){
        
    }

    setOnLoadCompletedListener(onLoadCompleted) {
        this.#loadCompletedListener = onLoadCompleted;
    }

    setOnLoadFailListener(onFail) {
        this.#loadFailedListener = onFail;
    }

    
}

class PageModuleBuilder {
    
    #pageModule;

    constructor(document) {
        this.#pageModule = new PageModule(document);
    }

    build() {
        return this.#pageModule;
    }

    setHasReferencesId(isHas) {
        this.#pageModule.setHasReferencesId(isHas);
        return this;
    }

    setHasInternalRoutes(isHas){
        this.#pageModule.setHasInternalRoutes(isHas);
        return this;
    }
    
    setHasExternalRoutes(isHas){
        this.#pageModule.setHasExternalRoutes(isHas);
        return this;
    }

    setHasStrings(isHas){
        this.#pageModule.setHasStrings(isHas);
        return this;
    }

    setHasImages(isHas){
        this.#pageModule.setHasImages(isHas);
        return this;
    }

    setHasLocateStrings(isHas) {
        
        return this;
    }
}