import sys
import os
import mimetypes
from pathlib import Path

_BLANK = " "
_TAB = "\t"
_BREK_LINE = "\n"
_CARRY_RETURN = "\r"

VALIDE_EXTENSION = [".html",".js",".css",".json",".xml"]

def trimFile(file):
    
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        sfiles = os.listdir(file)
        for f in sfiles:
            filePath = os.path.join(file,f)
            trimFile(filePath)
        #end
    #end
    type = mimetypes.guess_type(file)
    sufix = Path(file).suffix.lower()
    if(os.path.isfile(file) and ( (type[0] and type[0].startswith("text")) or sufix in VALIDE_EXTENSION ) ):
        
        bufferOut = []
        buffer = open(file, "r")
        for line in buffer:
            subline = line.strip() + "\n"
            if(len(subline) > 1 or ( len(subline) == 1 and subline not in(_BLANK,_TAB,_BREK_LINE,_CARRY_RETURN) )):
                bufferOut.append(subline) 
            #end
        #end
        buffer.close() 
        if (len(bufferOut) > 0):
            buffer = open(file, "w")
            buffer.writelines(bufferOut)
            buffer.close() 
        #end
    #end
#end

if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    trimFile(sys.argv[1])
#end