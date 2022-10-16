import sys
import os


def removeCssComments(file):
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        raise Exception("Can't operate over a directory: "+file)
    #end
#end

if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    removeCssComments(sys.argv[1])
#end