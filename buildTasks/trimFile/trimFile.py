import sys
import os
import mimetypes
import typing

from buildTasks.isBinaryFile.isBinaryFile import isBinaryFile

# file default break endline
_EMPTY : str = ""
_BLANK : str = " "
_TAB : str = "\t"
_BREK_LINE : str = "\n"
_CARRY_RETURN : str = "\r"

# file open modes
_READ_FILE_MODE : str = "r"
_WRITE_FILE_MODE : str = "w"

def trimFile(file : str, endLinePostTrim:str = _EMPTY) -> None:
    
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: " + file)
    #end
    
    if(os.path.isdir(file)):
        sfiles : list[str] = os.listdir(file)
        for f in sfiles:
            filePath = os.path.join(file,f)
            trimFile(filePath)
        #end
    #end
    type : tuple[str | None, str | None] = mimetypes.guess_type(file)

    #if(os.path.isfile(file) and not isBinaryFile(file) ):
    #   print(file)
        

    if(os.path.isfile(file) and type[0] and type[0].startswith("text")):

        bufferOut : list[str] = []
        buffer : typing.TextIO = open(file, _READ_FILE_MODE)
        
        for line in buffer: # undercover it is using something like buffer.readLine()
            subline : str = line.strip()
            if(len(subline) > 1 or ( len(subline) == 1 and subline not in(_BLANK,_TAB,_BREK_LINE,_CARRY_RETURN) )):
                subline = subline + endLinePostTrim
                bufferOut.append(subline) 
            #end
        #end
        buffer.close() 
        if (len(bufferOut) > 0):
            buffer = open(file, _WRITE_FILE_MODE)
            buffer.writelines(bufferOut)
            buffer.close() 
        #end
        
    #end
#end

if (__name__ == "__main__"):
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    trimFile(sys.argv[1])
#end