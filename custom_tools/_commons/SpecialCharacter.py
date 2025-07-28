from enum import Enum, unique

@unique
class SpecialCharacter(Enum):

    NULL_CHARACTER = (1,"\x00")
    DELETE_CHARACTER = (2,"\b")
    FORM_FEED = (3,"\f")
    

    def __init__(self, value, characterStr:str) -> None:
        super().__init__(self, value)
        self.__characterStr = characterStr
        
    #end

    def getCharacterStr(self) -> str:
        return self.__characterStr
    #end