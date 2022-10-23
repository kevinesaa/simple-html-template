import sys
import os


def removeJavaScriptComments(file):
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        raise Exception("Can't operate over a directory: "+file)
    #end
    
    with open(file) as f:
        t=[line for line in f]  
    # print(t , '\n')
    for i in range(2):
        t=line(t)
    # print(t)
    f=open(file,'w')
    for i in t:
        f.write(i)
#end
# logic for comment remove
def line(file):
    result=[]
    flag=0
    for i in file:
        # for single comment
        if(i.find('//')!=-1):
            # checking for use of // in string 
            if(i.find('.log')!=-1 and i.find('//') > i.find('.log')):
                j=i.rfind(';',i.find('.log'),len(i))
                result.append(i[:i.find('//',j)]+'\n')
            elif(i.find('.write')!=-1 and i.find('//') > i.find('.write')):
                j=i.rfind(';',i.find('.write'),len(i))
                result.append(i[:i.find('//',j)]+'\n')
            elif(i.find('.innerHTML')!=-1 and i.find('//') > i.find('.innnerHTML')):
                j=i.rfind(';',i.find('.innerHTML'),len(i))
                result.append(i[:i.find('//',j)]+'\n')
            elif(i.find('.innerText')!=-1 and i.find('//') > i.find('.innerText')):
                j=i.rfind(';',i.find('.innerText'),len(i))
                result.append(i[:i.find('//',j)]+'\n')
            elif(i.find('.alert')!=-1 and i.find('//') > i.find('.alert')):
                j=i.rfind(';',i.find('.alert'),len(i))
                result.append(i[:i.find('//',j)]+'\n')
            else:
                result.append(i[:i.find('//')])
        # for double comment
        elif(i.find('/*')!=-1):
            if(i.find('.log')!=-1 and i.find('/*') > i.find('.log')):
                j=i.rfind(';',i.find('.log'),len(i))
                if(i.find('*/',j)!=-1):
                    result.append(i[:i.find('/*',j)]+i[i.find('*/',j)+2:])
                else:    
                    result.append(i[:i.find('//',j)])
                    flag=1
            elif(i.find('.write')!=-1 and i.find('/*') > i.find('.write')):
                j=i.rfind(';',i.find('.write'),len(i))
                if(i.find('*/',j)!=-1):
                    result.append(i[:i.find('/*',j)]+i[i.find('*/',j)+2:])
                else:    
                    result.append(i[:i.find('//',j)])
                    flag=1
            elif(i.find('.innerHTML')!=-1 and i.find('/*') > i.find('.innnerHTML')):
                j=i.rfind(';',i.find('.innerHTML'),len(i))
                if(i.find('*/',j)!=-1):
                    result.append(i[:i.find('/*',j)]+i[i.find('*/',j)+2:])
                else:    
                    result.append(i[:i.find('//',j)])
                    flag=1
            elif(i.find('.innerText')!=-1 and i.find('/*') > i.find('.innerText')):
                j=i.rfind(';',i.find('.innerText'),len(i))
                if(i.find('*/',j)!=-1):
                    result.append(i[:i.find('/*',j)]+i[i.find('*/',j)+2:])
                else:    
                    result.append(i[:i.find('//',j)])
                    flag=1
            elif(i.find('.alert')!=-1 and i.find('/*') > i.find('.alert')):
                j=i.rfind(';',i.find('.alert'),len(i))
                if(i.find('*/',j)!=-1):
                    result.append(i[:i.find('/*',j)]+i[i.find('*/',j)+2:])
                else:    
                    result.append(i[:i.find('//',j)])
                    flag=1
            else:
                if(i.find('*/')!=-1):
                    result.append(i[:i.find('/*')]+i[i.find('*/')+2:])
                else:
                    result.append(i[:i.find('/*')])
                    flag=1
        elif(flag):
            if(i.find('*/')!=-1):
                result.append(i[i.find('*/')+2:])
                flag=0
        # if no commnet
        else:
            result.append(i)
    return result           
          
if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    removeJavaScriptComments(sys.argv[1])
#end