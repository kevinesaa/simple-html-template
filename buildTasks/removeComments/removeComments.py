import sys
import os
from pathlib import Path
import removeCssComments.removeCssComments as RemoveCssComments
import removeHtmlComments.removeHtmlComments as RemoveHtmlComments
import removeJavaScriptComments.removeJavaScriptComments as RemoveJavaScriptComments

def toRemoveHtmlComments(file):
    RemoveHtmlComments.removeHtmlComments(file)

def toRemoveCssComments(file):
    RemoveCssComments.removeCssComments(file)

def toRemoveJavaScriptComments(file):
    RemoveJavaScriptComments.removeJavaScriptComments(file)

OPERATION_FILE_EXTENSION = {
    ".html": toRemoveHtmlComments,
    ".css":toRemoveCssComments,
    ".js":toRemoveJavaScriptComments,
    ".json":toRemoveJavaScriptComments,
    ".xml":toRemoveHtmlComments
}

def removeComments(file):
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        sfiles = os.listdir(file)
        for f in sfiles:
            filePath = os.path.join(file,f)
            removeComments(filePath)
        #end
    #end
    sufix = Path(file).suffix.lower()
    if(os.path.isfile(file) and sufix in OPERATION_FILE_EXTENSION.keys()):
        func = OPERATION_FILE_EXTENSION[sufix]
        func(file) 
    #end
#end


if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    removeComments(sys.argv[1])
#end