


window.onload = function() {
    
    let t = new JsTextLoader(document,"./js/internal-routes.js");
    t.loadScript();
    let pageBuilder = new PageModuleBuilder(document)
    let page = pageBuilder
        .setHasReferencesId(true)
        .build();
    page.load();
}; 