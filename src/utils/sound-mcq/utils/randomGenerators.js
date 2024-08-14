function generateRandomIndex(array) {
	const MIN = 0
	const MAX = array.length;
	return Math.floor(Math.random() * (MAX - MIN) + MIN);
}

function getRandomElement(array) {
	var randomElement = array[generateRandomIndex(array)];
	return randomElement;
}

export { generateRandomIndex, getRandomElement };