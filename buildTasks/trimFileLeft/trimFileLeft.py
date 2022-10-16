import sys
import os
import mimetypes

_BLANK = " "
_TAB = "\t"
_BREK_LINE = "\n"
_CARRY_RETURN = "\r"

def trimFileLeft(file, ignoreExtension = []):
    
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File or directory not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        sfiles = os.listdir(file)
        for f in sfiles:
            filePath = os.path.join(file,f)
            trimFileLeft(filePath,ignoreExtension)
        #end
    #end
    type = mimetypes.guess_type(file)
    if(os.path.isfile(file) and type[0] and type[0].startswith("text")):
        
        bufferOut = []
        buffer = open(file, "r")

        for line in buffer:
            index = 0
            while(line.startswith(_BLANK,index) or 
                    line.startswith(_TAB,index) or 
                    line.startswith(_BREK_LINE,index) or
                    line.startswith(_CARRY_RETURN,index)):
                index = index + 1
            #end
            subline = line[index:]
            if(len(subline) > 1 or ( len(subline) == 1 and subline not in(_BLANK,_TAB,_BREK_LINE,_CARRY_RETURN) )):
                bufferOut.append(subline) 
            #end
        #end
        buffer.close() 
        buffer = open(file, "w")
        buffer.writelines(bufferOut)
        buffer.close() 
    #end
#end

if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    trimFileLeft(sys.argv[1])
#end