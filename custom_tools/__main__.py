
import sys
from custom_tools import cp


PROGRAMS = { "cp" : cp }

def addToArray(arr:list,element):
    if(arr is None):
        arr = []
    
    arr.append(element)
    return arr

def buildProgramArgs(args):
    
    options = None
    params = None
    output = None

    for item in args:
        element = str(item).strip()
        if(element.startswith("-")):
            element = element[1:]
            if(len(element) > 0):
                options = addToArray(options,element)
        else:
            params = addToArray(params,element)
    
    if( options is not None or params is not None ):
        output = { "options" :options, "params":params}

    return output

def main(args: list[str]):

    program_name = args[0]
    program = PROGRAMS[program_name]
    program_args = None
    if( len(args) > 1 ):
        input_temp = args[1:]
        program_args = buildProgramArgs(input_temp)
    
    program.execute(program_args)


if (__name__ == "__main__"):
    
    if( len(sys.argv ) > 1):
        main( sys.argv[1:])
    else:
        pass