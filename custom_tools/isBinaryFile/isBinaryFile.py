import os
import typing

from .._commons.EndLineCharacter import EndLineCharacter
from .._commons.SpecialCharacter import SpecialCharacter
from .._commons.FileOpenMode import FileOpenMode

__BYTES_TO_READ : int = 512
__CHAR_THRESHOLD : float = 0.3

__READ_FILE_MODE : str = FileOpenMode.READ_FILE_MODE.getReadModeStr()
__NULL_CHARACTER : str = SpecialCharacter.NULL_CHARACTER.getCharacterStr()

__TEXT_CHARACTERS : str = (''.join (
		[ chr(code) for code in range(32,127) ]
	).join( [
			EndLineCharacter.BREK_LINE.getCharacterStr(),
			EndLineCharacter.CARRY_RETURN.getCharacterStr(),
			EndLineCharacter.TAB.getCharacterStr(),
		]  
	).join( [
			SpecialCharacter.FORM_FEED.getCharacterStr(),
			SpecialCharacter.DELETE_CHARACTER.getCharacterStr()
		] 
	)
)


def isBinaryFile(filePath : str) -> bool:
	
	fileAbsolutePath : str = os.path.abspath(os.path.normpath(filePath))
	if (not os.path.exists(fileAbsolutePath)):
		raise Exception("File not exist: " + fileAbsolutePath)
    #end

	file : typing.TextIO  = open(fileAbsolutePath,__READ_FILE_MODE,encoding="ISO-8859-1")
	fileHeaderData : str = file.read(__BYTES_TO_READ)
	file.close()

	# store chunk length read
	dataLength : int = len(fileHeaderData)
	if (dataLength == 0):
		# empty files considered text
		return False
	#end
	
	if (__NULL_CHARACTER in fileHeaderData):
		# file containing null bytes is binary
		return True
	#end

	# remove all text characters from file chunk, get remaining length
	table = str.maketrans("", "", __TEXT_CHARACTERS)
	re : str = fileHeaderData.translate(table)
	binaryLength : int = len(re)

	# if percentage of binary characters above threshold, binary file
	return (
		(float(binaryLength) / dataLength) >= __CHAR_THRESHOLD
	)

#end

def execute(input : dict[str,list[str]])  -> None:
    """
    
    input example: {"params":["index.html"]}
    """
    
    args = input["params"]
    return isBinaryFile(args[0])
#end
