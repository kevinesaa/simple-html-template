
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

class PageModule {

    #commonsResourceToLoad = {
        
        hasInternalRoutes:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasExternalRoutes:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasStrings:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasImages:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
    }
	
    #moduleResourceToLoad = {
        hasReferenceId:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasInternalRoutes:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasExternalRoutes:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasStrings:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
        hasImages:{has:false,loadFunc:this.#loadReferenceId,loaded:false},
    }
    
    #loadCompletedListener;
    #loadFailedListener;
    #resourceWrapper;
    
    constructor() {
        this.#resourceWrapper = new ResourceWrapper();
        this.#resourceWrapper.commonResources = new Resources();
        this.#resourceWrapper.moduleResources = new Resources();
    }

    load() {
        this.#loadCommonsResources();
        this.#loadModuleResources();
    }
    
    resourceLoaded(keyResource) {
        console.log(keyResource);
    }

    setHasReferencesId(isHas) {
        this.#moduleResourceToLoad.hasReferenceId.has = isHas;
    }

    setHasInternalRoutes(isHas){
        this.#moduleResourceToLoad.hasInternalRoutes.has = isHas;
    }
    
    setHasExternalRoutes(isHas){
        this.#moduleResourceToLoad.hasExternalRoutes.has = isHas;
    }

    setHasStrings(isHas){
        this.#moduleResourceToLoad.hasStrings.has = isHas;
    }

    setHasImages(isHas){
        this.#moduleResourceToLoad.hasImages.has = isHas;
    }

    setOnLoadCompletedListener(onLoadCompleted) {
        this.#loadCompletedListener = onLoadCompleted;
    }

    setOnLoadFailListener(onFail) {
        this.#loadFailedListener = onFail;
    }
    
    static scriptLoader(scriptRoute, onLoadCallback, onLoadFailCallback ) 
    {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptRoute;
        script.onload = function() {
            if(onLoadCallback) {
                onLoadCallback(script);
            }
        };
        script.onerror = function (){
            console.log("fail to load " + scriptRoute);
            if(onLoadFailCallback) {
                onLoadFailCallback();
            }
        };
        document.body.appendChild(script);
    }

    loadInternalRoutesHelper(sourcesPaths, deepPath) 
    {
        const srcKeys = Object.keys(sourcesPaths);
        
        const routes = {};
        for(let i=0; i < srcKeys.length; i++) {
          const key = srcKeys[i];
          routes[key] = deepPath + sourcesPaths[key];
        }
        
        return routes;
    }

    #loadCommonsResources() {
        this.#loadHelper(this.#commonsResourceToLoad);
    }

    #loadModuleResources() {
        this.#loadHelper(this.#moduleResourceToLoad);
    }

    #loadHelper(resources) {
        const srcKeys = Object.keys(resources);
        for(let i=0; i < srcKeys.length; i++) {
            const key = srcKeys[i];
            const value = resources[key];
            if(value.has) {
                value.loadFunc();
            }
        }
    }

    #loadReferenceId() {
        const path = MY_MODULE_URI + "/js/" + FILE_NAMES.referencesIds;
        console.log(this.#moduleResourceToLoad.hasReferenceId);
        const resourceName = Object.getOwnPropertyNames("");
        
        PageModule.scriptLoader(path, () => {this.resourceLoaded(resourceName)});
     }
}

class PageModuleBuilder {
    
    #pageModule;

    constructor() {
        this.#pageModule = new PageModule();
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