import os
from custom_tools._commons.EndLineCharacter import EndLineCharacter
from custom_tools.cp import cp
from custom_tools.trimFile import trimFile

SOURCE_DIR : str = os.path.abspath("src/")
DIST_DIR : str = os.path.abspath("dist/")

if __name__ == "__main__":

    cp.cp(SOURCE_DIR, DIST_DIR)
    trimFile.trimFile(DIST_DIR,suffixTrimLine=EndLineCharacter.BREK_LINE.getCharacterStr())

#end
     