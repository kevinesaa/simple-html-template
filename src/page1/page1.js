
function showPage(R) {
    
    document.getElementById(R.MODULE_REFERENCE_ID.pageTitle).innerHTML = R.MODULE_STRINGS.title;
    document.getElementById(R.MODULE_REFERENCE_ID.goToHomeHref).href = R.COMMONS_INTERNAL_ROUTES.home;
    document.getElementById(R.MODULE_REFERENCE_ID.goToHomeHref).innerHTML =  R.COMMONS_STRINGS.goToHome;
    document.getElementById(R.MODULE_REFERENCE_ID.goToPageTwoHref).href = R.COMMONS_INTERNAL_ROUTES.page2; 
    document.getElementById(R.MODULE_REFERENCE_ID.goToPageTwoHref).innerHTML = R.COMMONS_STRINGS.goToPageTwo; 
    document.getElementById(R.MODULE_REFERENCE_ID.image).src = R.MODULE_IMAGES.image; 
    
}

window.onload = function() {
    
    const builderPage = new PageModuleBuilder(document, MAIN_SCRIPT_PATH)
                                .setHasReferencesId(true)
                                .setHasInternalRoutes(true)
                                .setHasImages(true)
                                .setHasStrings(true)
                                .setHasLocateStrings(true)
                                .addCommonInternalRoutes(true)
                                .addCommonStrings(true)
                                .addCommonLocateStrings(true);
    
    const page = builderPage.build(showPage,
        //on fail load listener
        () => {
            console.log("something is wrong");
        }
    );
    page.loadPage();
}; 