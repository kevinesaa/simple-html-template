


window.onload = function() {
    let pageBuilder = new PageModuleBuilder()
    let page = pageBuilder.setHasReferencesId(true).build();
    console.log(page.load());
}; 