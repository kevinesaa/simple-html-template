


window.onload = function() {
    const myLang = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage;

    const commonExternalRoutes = new JsLoader(document,"../_commons/js/external-routes.js","COMMONS_EXTERNAL_ROUTES",()=>{
        console.log(commonExternalRoutes.myResource);
    });
    commonExternalRoutes.loadScript();

    const commonTexts = new JsTextLoader(document,"../_commons/js/strings.js","COMMONS_STRINGS",true,myLang.substring(0,2),"COMMON_LOCATE_STRINGS",() => {
        console.log(commonTexts.myResource);
    });
    commonTexts.loadScript();
    
    const commonInternalRoutes = new JsInternalRouteLoader(document,"../_commons/js/internal-routes.js",MAIN_SCRIPT_PATH,"COMMONS_INTERNAL_ROUTES",() => {
        console.log(commonInternalRoutes.myResource);
    });
    commonInternalRoutes.loadScript();

    const commonImages = new JsInternalRouteLoader(document,"../_commons/js/images.js",MAIN_SCRIPT_PATH,"COMMONS_IMAGES",() => {
        console.log(commonImages.myResource);
    });
    commonImages.loadScript();

    //home resources
    const referencesIds = new JsLoader(document,"./js/referencesIds.js","REFERENCE_ID",() => {
        console.log(referencesIds.myResource);
    });
    referencesIds.loadScript();

    const homeExternalRoutes = new JsLoader(document,"./js/external-routes.js","HOME_EXTERNAL_ROUTES",() => {
        console.log(homeExternalRoutes.myResource);
    });
    homeExternalRoutes.loadScript();

    const homeTexts = new JsTextLoader(document,"./js/strings.js","HOME_STRINGS",true,myLang.substring(0,2),"LOCATE_HOME_STRINGS",() => {
        console.log(homeTexts.myResource);
    });
    homeTexts.loadScript();

    const homeInternalRoutes = new JsInternalRouteLoader(document,"./js/internal-routes.js",MAIN_SCRIPT_PATH,"HOME_ROUTES",() => {
        console.log(homeInternalRoutes.myResource);
    });
    homeInternalRoutes.loadScript();

    const homeImages = new JsInternalRouteLoader(document,"./js/images.js",MAIN_SCRIPT_PATH,"HOME_IMAGES",() => {
        console.log(homeImages.myResource);
    });
    homeImages.loadScript();

    const builderPage = new PageModuleBuilder(document,MAIN_SCRIPT_PATH)
                                .setHasReferencesId(false,"REFERENCE_ID")
                                .setHasExternalRoutes(false,"COMMONS_EXTERNAL_ROUTES")
                                .setHasInternalRoutes(false,"COMMONS_INTERNAL_ROUTES")
                                .setHasImages(false,"COMMONS_IMAGES")
                                .setHasStrings(false,"COMMONS_STRINGS")
                                .setHasLocateStrings(false,myLang.substring(0,2),"LOCATE_COMMONS_STRINGS");
    
    const page = builderPage.build(
        //on completed load listener
        ()=> {},
        //on fail load listener
        ()=> {}
    );
}; 