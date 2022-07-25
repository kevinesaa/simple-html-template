


window.onload = function() {
    
    const builderPage = new PageModuleBuilder(document, MAIN_SCRIPT_PATH)
                                .setHasReferencesId(true)
                                .setHasExternalRoutes(true)
                                .setHasInternalRoutes(true)
                                .setHasImages(true)
                                .setHasStrings(true)
                                .setHasLocateStrings(true)
                                .addCommonReferencesId(true)
                                .addCommonExternalRoutes(true)
                                .addCommonInternalRoutes(true)
                                .addCommonImages(true)
                                .addCommonStrings(true)
                                .addCommonLocateStrings(true);
    
    const page = builderPage.build(
        //on completed load listener
        (resources)=> {
            console.log(resources);
            console.log(resources.MODULE_REFERENCE_ID);
        },
        //on fail load listener
        ()=> {
            console.log("something is wrong");
        }
    );
    page.loadPage();
}; 