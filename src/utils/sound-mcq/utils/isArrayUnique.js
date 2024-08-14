// checks whether properties in an array of objects are equal
function isAOOPropUnique(array, prop) {
	for(let i = 0; i < array.length - 1; i++) {
		for(let j = i + 1; j < array.length - 1; j++) {
			if(array[i][prop] === array[j][prop]) {
				return false
			}
		}
	}
	return true;
}

// check if an array element has duplicates
function arrayHasDuplicates(array) {
	return array.every((element) => array.indexOf(element) === array.lastIndexOf(element));
}

export default { isAOOPropUnique, arrayHasDuplicates };
