const { generateRandomIndex, getRandomElement } = require("./utils/randomGenerators");

function generateQuiz(questionBank, optionsBank, numberOfQuestions = 5, numberOfOptions = 4, mapQA) {
	if(!questionBank) {
		throw new Error("No question bank passed");
	}

	if(!Array.isArray(questionBank)) {
		throw new Error("questionBank must be an array");
	}

	if(numberOfQuestions > questionBank.length) {
		throw new Error("Number of questions must be smaller than question bank size");
	}

	if(!optionsBank) {
		throw new Error("No options bank passed");
	}

	if(!Array.isArray(optionsBank)) {
		throw new Error("optionsBank must be an array");
	}

	if(numberOfOptions > optionsBank.length) {
		throw new Error("Number of options must be smaller than options bank size");
	}

	if(mapQA && typeof mapQA !== 'function') {
		throw new Error("mapQA must be a function");
	}

	const questions = [];
	
	// stores the questions generated so we can check for uniqueness
	const randomQuestions = [];
	for(let i = 0; i < numberOfQuestions; i++) {
		while(questions.length < numberOfQuestions) {
			const question = getRandomElement(questionBank);
			if(!randomQuestions.includes(question)) {
				randomQuestions.push(question)
			} else {
				continue;
			}

			// generate options
			const options = [];

			while(options.length < numberOfOptions) {
				let option = getRandomElement(optionsBank);

				if(!options.includes(option)) {
					options.push(option);
				} else {
					continue;
				}
			}

			let answer = ''
			if(!mapQA) {
				answer = question;
			} else {
				answer = mapQA();
			}

			const answerIndex = generateRandomIndex(options);
			// the correct option might have been generated already
			if(!options.includes(answer)) {
				options.splice(answerIndex, 1, answer);
			}

			questions.push({
				question, options, answer
			});	
		}
	}

	return questions 
}

module.exports = generateQuiz;