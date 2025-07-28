from custom_tools import cp
from custom_tools import trimFile
from custom_tools import isBinaryFile


def buildPrograms() -> dict[str, object]:
    PROGRAMS = { 
        "cp" : cp, 
        "trim_file": trimFile,
        "is_binary_file":isBinaryFile
    }

    return PROGRAMS