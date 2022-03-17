
function loadRoutesHelper(sourcesPaths, deepPath){
  
  const srcKeys = Object.keys(sourcesPaths);
  
  const routes = {};
  for(let i=0; i < srcKeys.length; i++) {
    const key = srcKeys[i];
    routes[key] = deepPath + sourcesPaths[key];
  }
  
  return routes;
}

