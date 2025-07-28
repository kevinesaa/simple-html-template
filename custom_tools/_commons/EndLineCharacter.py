from enum import Enum, unique

@unique
class EndLineCharacter(Enum):
    
    __ALL_END_LINE_CHARACTERS_ARRAY:list[str] = []
    
    EMPTY = (1,"")
    BLANK = (2," ")
    TAB = (3,"\t")
    BREK_LINE = (4,"\n")
    CARRY_RETURN = (5,"\r")


    def __init__(self, value, characterStr:str) -> None:
        super().__init__(self, value)
        self.__characterStr = characterStr
    #end

    def getCharacterStr(self) -> str:
        
        return self.__characterStr
    #end

    def getAllCharactersArray() -> list[str]:
        
        if( len(EndLineCharacter.__ALL_END_LINE_CHARACTERS_ARRAY) == 0): 
            values = [ item.getCharacterStr() for item in EndLineCharacter ]
            EndLineCharacter.__ALL_END_LINE_CHARACTERS_ARRAY = values

        return EndLineCharacter.__ALL_END_LINE_CHARACTERS_ARRAY
    #end