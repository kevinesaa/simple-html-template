import sys
import os


def removeHtmlComments(file):
    file = os.path.abspath(os.path.normpath(file))
    if (not os.path.exists(file)):
        raise Exception("File not exist: "+file)
    #end
    
    if(os.path.isdir(file)):
        raise Exception("Can't operate over a directory: "+file)
    #end
    lines=[]
    with open(file) as f:
        lines = [line for line in f]
        # print(lines)
    flag =0
    out_lines=[]
    for i in lines:
        if(i.find('<!--')!=-1 ):
            comment_start = i.find('<!--')
            comment_end   = i.find('-->')
            if comment_end == -1 :
                flag =1
                out_lines.append(i[:comment_start]+'\n')
            else:
                j = i[:comment_start] + i[comment_end+3:]
                out_lines.append(j)
        elif flag:
            comment_end   = i.find('-->')
            if(comment_end!=-1):
                j=i[comment_end+4:]
                out_lines.append(j)
                flag=0
        else:
            out_lines.append(i)
    # print(out_lines)

    with open(file, "w") as fp:
        fp.writelines(out_lines)
    

#end

if __name__ == "__main__":
    
    if(len(sys.argv) != 2):
        raise Exception("no valid arguments lenght")
    #end
    removeHtmlComments(sys.argv[1])
#end