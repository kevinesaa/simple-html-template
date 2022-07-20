

const SITE_PREFIX = "my-site";
const STORE_USER_LANG = SITE_PREFIX + "_user-lang";

const MAIN_SCRIPT_URI = document.currentScript.src;
const MAIN_SCRIPT_PATH = MAIN_SCRIPT_URI.substring(0,MAIN_SCRIPT_URI.lastIndexOf("/"));

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


class Resources {
    referencesId;
    externalRoutes;
    internalRoutes;
    images;
    strings;
}

class ResourceWrapper {
    commonResources;
    moduleResources;
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
    
    loadScript() {
        JsLoader.scriptLoader(this.myDocument,this.myFileRoute, () => {
            
        });
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

    #commonsResourceToLoad = {
        
        internalRoutes:{has:false,loaded:false},
        externalRoutes:{has:false,loaded:false},
        strings:{has:false,loaded:false},
        images:{has:false,loaded:false},
    }
	
    #moduleResourceToLoad = {
        referencesIds:{has:false,loaded:false},
        internalRoutes:{has:false,loaded:false},
        externalRoutes:{has:false,loaded:false},
        strings:{has:false,loaded:false},
        images:{has:false,loaded:false},
    }
    
    #loadCompletedListener;
    #loadFailedListener;
    #resourceWrapper;
    #myDocument;

    constructor(document) {
        this.#resourceWrapper = new ResourceWrapper();
        this.#resourceWrapper.commonResources = new Resources();
        this.#resourceWrapper.moduleResources = new Resources();
        this.#myDocument = document;
    }

    load() {
        this.#loadCommonsResources();
        this.#loadModuleResources();
    }
    
    resourceLoaded() {
        const allCommonsLoaded = this. #checkResourcesLoaded(this.#commonsResourceToLoad);
        const allModule = this. #checkResourcesLoaded(this.#moduleResourceToLoad);
        if(allCommonsLoaded && allModule) {

        }
    }

    setHasReferencesId(isHas) {
        this.#moduleResourceToLoad.referencesIds.has = isHas;
    }

    setHasInternalRoutes(isHas){
        this.#moduleResourceToLoad.internalRoutes.has = isHas;
    }
    
    setHasExternalRoutes(isHas){
        this.#moduleResourceToLoad.externalRoutes.has = isHas;
    }

    setHasStrings(isHas){
        this.#moduleResourceToLoad.strings.has = isHas;
    }

    setHasImages(isHas){
        this.#moduleResourceToLoad.images.has = isHas;
    }

    setOnLoadCompletedListener(onLoadCompleted) {
        this.#loadCompletedListener = onLoadCompleted;
    }

    setOnLoadFailListener(onFail) {
        this.#loadFailedListener = onFail;
    }

    #loadCommonsResources() {
        const path = MAIN_SCRIPT_PATH +"/";
        this.#loadHelper(path,this.#commonsResourceToLoad);
    }

    #loadModuleResources() {
        const path = MY_MODULE_URI +"/js/";
        this.#loadHelper(path,this.#moduleResourceToLoad);
    }

    #loadHelper(pathFolder,resources) {
        const srcKeys = Object.keys(resources);
        for(let i = 0; i < srcKeys.length; i++) {
            const key = srcKeys[i];
            const value = resources[key];
            
            if(value.has) {
                const file = pathFolder + FILE_NAMES[key];
                JsLoader.scriptLoader(this.#myDocument,file,()=> {
                    value.loaded = true;
                    this.resourceLoaded();
                },
                this.#loadFailedListener);
            }
        }
    }

    #checkResourcesLoaded(resources) {
        let has = 0;
        let loaded = 0;
        const srcKeys = Object.keys(resources);
        for(let i = 0; i < srcKeys.length; i++) {
            const key = srcKeys[i];
            const value = resources[key];
            
            if(value.has) {
                has++;
            }

            if(value.loaded) {
                loaded++;
            }
        }
        
        if(has === 0) {
            return true;
        }
        else {
            return has === loaded;
        }
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

    setOnLoadCompletedListener(onLoadCompleted) {
        this.#pageModule.setOnLoadCompletedListener(onLoadCompleted);
        return this;
    }

    setOnLoadFailListener(onFail) {
        this.#pageModule.setOnLoadFailListener(onFail);
        return this;
    }
}