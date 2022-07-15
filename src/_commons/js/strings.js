
const DEFAULT_COMMONS_STRINGS = {
	goToHome:"Go to main page",
	goToPageOne:"Go to page one",
	goToPageTwo:"Go to page two",
};

function loadStringsHelper(locateStrings){
	
	const srcKeys = Object.keys(locateStrings);
	
	const strings = {};
	for(let i=0; i < srcKeys.length; i++) {
	  const key = srcKeys[i];
	  strings[key] =  DEFAULT_COMMONS_STRINGS[key];
	  if(locateStrings[key]) 
	  {
		strings[key] = locateStrings[key];
	  }
	}
	
	return strings;
}


