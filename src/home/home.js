


window.onload = function() {
    
/*
    const commonExternalRoutes = new JsLoader(document,"../_commons/js/external-routes.js","COMMONS_EXTERNAL_ROUTES",()=>{
        console.log(commonExternalRoutes.myResource);
    });
    commonExternalRoutes.loadScript();

    const commonTexts = new JsTextLoader(document,"../_commons/js/strings.js","COMMONS_STRINGS",true,USER_LANG.substring(0,2),"COMMON_LOCATE_STRINGS",() => {
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
*/

    const builderPage = new PageModuleBuilder(document, MAIN_SCRIPT_PATH)
                                .setHasReferencesId(true)
                                .setHasExternalRoutes(true)
                                .setHasInternalRoutes(true)
                                .setHasImages(true)
                                .setHasStrings(true)
                                .setHasLocateStrings(true)
                                .addCommonReferencesId(true)
                                .addCommonExternalRoutes(false,"COMMONS_EXTERNAL_ROUTES","../_commons/js/external-routes.js")
                                .addCommonInternalRoutes(false,"COMMONS_INTERNAL_ROUTES","../_commons/js/internal-routes.js")
                                .addCommonImages(false,"COMMONS_IMAGES","../_commons/js/images.js")
                                .addCommonStrings(false,"COMMONS_STRINGS","../_commons/js/strings.js")
                                .addCommonLocateStrings(false,"COMMON_LOCATE_STRINGS","../_commons/js/strings/"+USER_LANG.substring(0,2)+".js");
    
    const page = builderPage.build(
        //on completed load listener
        ()=> {},
        //on fail load listener
        ()=> {}
    );
    page.loadPage();
}; 