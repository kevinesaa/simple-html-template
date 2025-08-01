
import os
import typing

from .._commons.EndLineCharacter import EndLineCharacter
from .._commons.FileOpenMode import FileOpenMode
from ..isBinaryFile.isBinaryFile import isBinaryFile

# file default break endline
__EMPTY : str = EndLineCharacter.EMPTY.getCharacterStr()

__END_LINE_ARRAY : list[str] = EndLineCharacter.getAllCharactersArray()

# file open modes
__READ_FILE_MODE : str = FileOpenMode.READ_FILE_MODE.getReadModeStr()
__WRITE_FILE_MODE : str = FileOpenMode.WRITE_FILE_MODE.getReadModeStr()

def trimFile(file : str,prefixTrimLine:str = __EMPTY, suffixTrimLine:str = __EMPTY) -> None:
    
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: " + file)
    #end
    
    if(os.path.isdir(file)):
        sfiles : list[str] = os.listdir(file)
        for f in sfiles:
            filePath : str = os.path.join(file,f)
            trimFile(filePath,prefixTrimLine,suffixTrimLine)
        #end
    #end

    if(os.path.isfile(file) and not isBinaryFile(file) ):
    
        bufferOut : list[str] = []
        buffer : typing.TextIO = open(file, __READ_FILE_MODE)
        
        for line in buffer: # undercover it is using something like buffer.readLine()
            subline : str = line.strip()
            if(len(subline) > 1 or ( len(subline) == 1 and subline not in(__END_LINE_ARRAY) )):
                subline = prefixTrimLine + subline + suffixTrimLine
                bufferOut.append(subline) 
            #end
        #end
        buffer.close() 
        if (len(bufferOut) > 0):
            buffer = open(file, __WRITE_FILE_MODE)
            buffer.writelines(bufferOut)
            buffer.close() 
        #end
        
    #end
#end

def execute(input : dict[str,list[str]]) -> None:
    """
    
    input example: {"params":["index.html"]}
    """
    
    args = input["params"]
    trimFile(args[0])
#end

