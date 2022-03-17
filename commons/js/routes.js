
const COMMONS_ROUTES = {
	home:"index.html",
	page1:"pages/page1/index.html",
	page2:"pages/page2/index.html"
};


function loadMyRoutes(deepPath){
  return loadRoutesHelper(COMMONS_ROUTES, deepPath);
}

