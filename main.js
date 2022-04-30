const SITE_PREFIX = "my-site";
const STORE_USER_LANG = SITE_PREFIX + "_user-lang";
const MAIN_SCRIPT_URI = document.currentScript.src;
const MAIN_SCRIPT_PATH = MAIN_SCRIPT_URI.substring(0,MAIN_SCRIPT_URI.lastIndexOf("/")+1);
const USER_LANG = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage; 

let commonsStrings;
let commonsRoutes;
let commonImagesRoutes;

let actionOnLangLoadComplete;
let actionOnRoutesLoadComplete;
let actionOnImagesLoadComplete;

const R = [
    { route:"commons/js/strings.js", load:false },
    { route:"commons/js/routes-util-builder.js", load:false },
    { route:"commons/js/routes.js", load:false },
    { route:"commons/js/images.js", load:false },
];

function loadCommonResources() {
    
    for(let i = 0; i<R.length; i++){
        scriptLoader(MAIN_SCRIPT_PATH + R[i].route, function(){
            R[i].load = true;
            let completed = true;
            for(let j = 0; j < R.length; j++){
                completed = completed && R[j].load;
                if(!completed){
                    break;
                }
            }
            if(completed) {
                onLoadCommonResourcesComplete();
            }
        });
    }
   
}

function scriptLoader(scriptRoute, onLoadCallback, onLoadFailCallback ) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptRoute;
    script.onload = function() {
        if(onLoadCallback) {
            onLoadCallback(script);
        }
    };
    script.onerror = function (){
        if(onLoadFailCallback) {
            onLoadFailCallback();
        }
    };
    document.body.appendChild(script);
}

function onLoadCommonResourcesComplete() {
    
    commonsRoutes = loadMyRoutes(MAIN_SCRIPT_PATH);
    if(actionOnRoutesLoadComplete) {
        actionOnRoutesLoadComplete();
    }
    //commonImagesRoutes = loadMyImagesRoutes(MAIN_SCRIPT_PATH);
    loadStrings(USER_LANG);
}

function loadStrings(lang){
    
    let localizationFileUrl = MAIN_SCRIPT_PATH + "commons/js/strings/" + lang.substring(0,2) + ".js";
    localizationFileUrl=localizationFileUrl.toLowerCase();
    scriptLoader(localizationFileUrl, 
        function(langScriptElement) {
            commonsStrings = loadStringsHelper(LOCATE_STRINGS);
            localStorage.setItem(STORE_USER_LANG,lang);
            if(actionOnLangLoadComplete) {
                actionOnLangLoadComplete();
            }
            document.body.removeChild(langScriptElement);
        },
        function() {
            console.log("fail to load " + localizationFileUrl);
            commonsStrings = loadStringsHelper(DEFAULT_COMMONS_STRINGS);
            if(actionOnLangLoadComplete) {
                actionOnLangLoadComplete();
            }
    });
}


function main() 
{
    loadCommonResources();
}

main();