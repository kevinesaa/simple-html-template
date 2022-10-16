import sys
import os
import shutil

def cp(source,dest):
    
    destExist = os.path.exists(dest)
    destIsDir = False
    if (destExist):
        destIsDir = os.path.isdir(dest)
    else: 
        destIsDir = (dest[-1] == "/") or (dest[-1] == "\\")
    #end

    source = os.path.abspath(os.path.normpath(source))
    dest = os.path.abspath(os.path.normpath(dest))
    
    if(not os.path.exists(source)):
        raise Exception("no valid source. File or directory not exist: "+source)
    #end

    if(os.path.isdir(source)):
        if(not destExist):
           shutil.copytree(source,dest)
        else:
            sfiles = os.listdir(source)
            for file in sfiles:
                filePath = os.path.join(source,file)
                destPath = os.path.join(dest,file)
                cp(filePath,destPath)
            #end
        #end
    #end

    if(os.path.isfile(source)):
        
        if(not destExist):
            if(destIsDir):
                os.makedirs(dest,exist_ok=True)
                os.path.join(dest,os.path.basename(source))
            else:
                destBaseName = os.path.basename(dest)
                index = len(dest) - len(destBaseName)
                destParent = dest[:index]
                os.makedirs(destParent,exist_ok=True)
            #end
        #end   
        shutil.copy(source,dest)
    #end
#end
                
if __name__ == "__main__":
    if(len(sys.argv) < 3):
        raise Exception("no valid arguments lenght")
    myArgs = sys.argv[1:]
    if(len(myArgs) > 2):
        raise Exception("no valid arguments lenght. To many arguments")
    cp(myArgs[0],myArgs[1])
#end