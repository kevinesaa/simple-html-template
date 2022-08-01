
//https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript
//this script always have to be in the root directory of the project
const MAIN_SCRIPT_URI = document.currentScript.src;
const MAIN_SCRIPT_PATH = MAIN_SCRIPT_URI.substring(0,MAIN_SCRIPT_URI.lastIndexOf("/"));