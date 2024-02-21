import sys
import os
import shutil

_LAST_INDEX : int = -1

def cp(sourcePath : str, destPath : str ) -> None: 
    
    destPathExist : bool = os.path.exists(destPath)
    destPathIsDir : bool = False
    if (destPathExist):
        destPathIsDir = os.path.isdir(destPath)
    else: 
        destPathIsDir = (destPath[_LAST_INDEX] == "/") or (destPath[_LAST_INDEX] == "\\")
    #end

    sourcePath = os.path.abspath(os.path.normpath(sourcePath))
    destPath = os.path.abspath(os.path.normpath(destPath))
    
    if(not os.path.exists(sourcePath)):
        raise Exception("no valid source. File or directory not exist: " + sourcePath)
    #end

    if(os.path.isdir(sourcePath)):
        if(not destPathExist):
           shutil.copytree(sourcePath,destPath)
        else:
            sfiles : list[str] = os.listdir(sourcePath)
            for file in sfiles:
                filePath : str = os.path.join(sourcePath,file)
                newDestPath : str = os.path.join(destPath,file)
                cp(filePath,newDestPath)
            #end
        #end
    #end

    if(os.path.isfile(sourcePath)):
        
        if(not destPathExist):
            if(destPathIsDir):
                os.makedirs(destPath,exist_ok=True)
                os.path.join(destPath,os.path.basename(sourcePath))
            else:
                destFileBaseName : str = os.path.basename(destPath)
                index : int = len(destPath) - len(destFileBaseName)
                destParent : str = destPath[:index]
                os.makedirs(destParent,exist_ok=True)
            #end
        #end   
        shutil.copy(sourcePath,destPath)
    #end
#end

def main(args : list[str]) -> None:
    if(len(sys.argv) < 3):
        raise Exception("no valid arguments lenght")
    myArgs = sys.argv[1:]
    if(len(myArgs) > 2):
        raise Exception("no valid arguments lenght. To many arguments")
    cp(myArgs[0],myArgs[1])

#end

if __name__ == "__main__":
    main(sys.argv)
#end