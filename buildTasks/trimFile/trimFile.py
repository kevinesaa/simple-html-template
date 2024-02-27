import sys
import os
import typing

from buildTasks.isBinaryFile.isBinaryFile import isBinaryFile

# file default break endline
_EMPTY : str = ""
_BLANK : str = " "
_TAB : str = "\t"
_BREK_LINE : str = "\n"
_CARRY_RETURN : str = "\r"

_END_LINE_ARRAY : list[str] = [_EMPTY,_BLANK,_TAB,_BREK_LINE, _CARRY_RETURN]

# file open modes
_READ_FILE_MODE : str = "r"
_WRITE_FILE_MODE : str = "w"

def trimFile(file : str,prefixTrimLine:str = _EMPTY, suffixTrimLine:str = _EMPTY) -> None:
    
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: " + file)
    #end
    
    if(os.path.isdir(file)):
        sfiles : list[str] = os.listdir(file)
        for f in sfiles:
            filePath : str = os.path.join(file,f)
            trimFile(filePath)
        #end
    #end

    if(os.path.isfile(file) and not isBinaryFile(file) ):
    
        bufferOut : list[str] = []
        buffer : typing.TextIO = open(file, _READ_FILE_MODE)
        
        for line in buffer: # undercover it is using something like buffer.readLine()
            subline : str = line.strip()
            if(len(subline) > 1 or ( len(subline) == 1 and subline not in(_END_LINE_ARRAY) )):
                subline = prefixTrimLine + subline + suffixTrimLine
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

def main(args : list[str]) -> None:
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    trimFile(sys.argv[1])
#end

if (__name__ == "__main__"):
    main(sys.argv)
#end