from enum import Enum, unique

@unique
class FileOpenMode(Enum):

    READ_FILE_MODE = (1,"r")
    WRITE_FILE_MODE = (2,"w")

    def __init__(self, value, readModeStr:str) -> None:
        super().__init__(self, value)
        self.__readModeStr = readModeStr
    #end

    def getReadModeStr(self) -> str:
        return self.__readModeStr
    #end