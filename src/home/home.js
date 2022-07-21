


window.onload = function() {
    const myLang = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage;
    //doc, scriptRoute, defultcontainerVarName, hasLocateText, lang, locateVarName, loadCompletedListener, loadFailListener
    let texts = new JsTextLoader(document,"./js/strings.js","HOME_STRINGS",true,myLang.substring(0,2),"LOCATE_HOME_STRINGS",()=>{
        console.log(texts.myResource);
    });
    texts.loadScript();
    //JsLoader referencesIds;
    //JsLoader externalRoutes;
    //JsInternalRouteLoader images;
    //JsInternalRouteLoader internalRoutes;
    //JsTextLoader strings;
}; 