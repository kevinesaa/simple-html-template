import os
from buildTasks.cp.cp import cp
from buildTasks.trimFile import trimFile

SOURCE_DIR : str = os.path.abspath("src/")
DIST_DIR : str = os.path.abspath("dist/")

if __name__ == "__main__":

    cp(SOURCE_DIR, DIST_DIR)
    trimFile.trimFile(DIST_DIR,suffixTrimLine=trimFile._BREK_LINE)

#end
     