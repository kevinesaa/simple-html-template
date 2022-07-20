


window.onload = function() {
    const myLang = localStorage.getItem(STORE_USER_LANG) || 
    navigator.userLanguage || 
	navigator.language || 
	navigator.browserLanguage || 
	navigator.systemLanguage;
    let t = new JsTextLoader(document,"./js/strings.js",myLang.substring(0,2),"HOME_STRINGS","LOCATE_HOME_STRINGS");
    t.loadScript();
    
}; 