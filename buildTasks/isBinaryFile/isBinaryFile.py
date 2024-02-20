import os
import typing

_READ_FILE_MODE : str = "r"
_NULL_CHARACTER : str = '\x00'
_READ_BYTES : int = 512
_CHAR_THRESHOLD : float = 0.3
_TEXT_CHARACTERS : str = ''.join(
	[chr(code) for code in range(32,127)] +
	list('\b\f\n\r\t')
)


def isBinaryFile(filePath:str) -> bool:
	
	fileAbsolutePath : str = os.path.abspath(os.path.normpath(filePath))
	if (not os.path.exists(fileAbsolutePath)):
		raise Exception("File or directory not exist: " + fileAbsolutePath)
    #end

	file : typing.TextIO  = open(fileAbsolutePath,_READ_FILE_MODE,encoding="ISO-8859-1")
	fileHeaderData = file.read(_READ_BYTES)
	file.close()

	# store chunk length read
	dataLength : int = len(fileHeaderData)
	if (dataLength == 0):
		# empty files considered text
		return False
	#end
	
	if (_NULL_CHARACTER in fileHeaderData):
		# file containing null bytes is binary
		return True
	#end

	# remove all text characters from file chunk, get remaining length
	table = str.maketrans("", "", _TEXT_CHARACTERS)
	re : str = fileHeaderData.translate(table)
	binaryLength : int = len(re)

	# if percentage of binary characters above threshold, binary file
	return (
		(float(binaryLength) / dataLength) >= _CHAR_THRESHOLD
	)

#end