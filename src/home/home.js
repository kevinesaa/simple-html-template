
function showPage(R) {
    
    document.getElementById(R.MODULE_REFERENCE_ID.homeTitle).innerHTML =  R.MODULE_STRINGS.homeTitle;	
	document.getElementById(R.MODULE_REFERENCE_ID.goToPageOneHref).href = R.COMMONS_INTERNAL_ROUTES.page1; 
	document.getElementById(R.MODULE_REFERENCE_ID.goToPageOneHref).innerHTML = R.COMMONS_STRINGS.goToPageOne; 
	document.getElementById(R.MODULE_REFERENCE_ID.goToPageTwoHref).href = R.COMMONS_INTERNAL_ROUTES.page2; 
	document.getElementById(R.MODULE_REFERENCE_ID.goToPageTwoHref).innerHTML = R.COMMONS_STRINGS.goToPageTwo; 
	document.getElementById(R.MODULE_REFERENCE_ID.image).src = R.COMMONS_IMAGES.image; 
}

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
    
    const page = builderPage.build(showPage,
        //on fail load listener
        ()=> {
            console.log("something is wrong");
        }
    );
    page.loadPage();
}; 