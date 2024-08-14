import { defineStore } from "pinia";
import generateQuiz from "@/utils/sound-mcq/quizGenerator";
import ANIMAL_SOUNDS from '../assets/data/animal_sounds.json';
import OPTIONS from '../assets/data/options.json';

export const useQuestionsStore = defineStore('questions', {
    state: () => ({
        questions: generateQuiz(ANIMAL_SOUNDS, OPTIONS)
    }),
    actions: {
        setQuestions() {
            this.questions = generateQuiz(ANIMAL_SOUNDS, OPTIONS);
        }
    }
})