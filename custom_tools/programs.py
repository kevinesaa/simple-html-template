from custom_tools import cp
from custom_tools import trimFile


def buildPrograms() -> dict[str, object]:
    PROGRAMS = { 
        "cp" : cp, 
        "trim_file": trimFile
    }

    return PROGRAMS