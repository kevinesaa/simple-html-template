
const COMMONS_INTERNAL_ROUTES = {
	home:"home/index.html",
	page1:"page1/index.html",
	page2:"page2/index.html"
};


function loadMyRoutes(deepPath){
  return loadRoutesHelper(COMMONS_INTERNAL_ROUTES, deepPath);
}

