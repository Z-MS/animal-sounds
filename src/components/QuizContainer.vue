<script setup>
    import { ref, onMounted } from 'vue';
    import Question from './Question.vue';
    import { Modal } from 'bootstrap';
    import { useUserStore } from '@/stores/user'; 

    const props = defineProps({
        questions: Object
    })

    const emit = defineEmits(['generateQuestions']);

    const userStore = useUserStore();

    let gameOverModal;

    onMounted(() => {
        userStore.setHighScore();
        gameOverModal = new Modal('#gameOverModal');
    })

    let score = 0;
    
    let questionCounter = ref(0);
    let currentQuestion = ref(props.questions[questionCounter.value]);
    let optionsDisabled = ref(false);
    let questionAudio = null;

    function playSound() {
        questionAudio = new Audio(`sounds/${currentQuestion.value.question}.mp3`);
        questionAudio.play();
    }

    function checkAnswer(option) {
        optionsDisabled.value = true;
        if(option === currentQuestion.value.answer) {
            score++;
        }
    }

    function loadNextQuestion() {
        // stop playing the audio
        questionAudio.pause();

        if(questionCounter.value + 1 < props.questions.length) {
            questionCounter.value++;
            optionsDisabled.value = false;
            currentQuestion.value = props.questions[questionCounter.value];
        } else {
            userStore.incrementTimesPlayed();
            if(score > userStore.highScore) {
                userStore.setHighScore(score);
            } 
            // open game over modal
            gameOverModal.show();
        }
    }

    function restart() {
        emit('generateQuestions');

        questionCounter.value = 0;
        currentQuestion.value = props.questions[questionCounter.value];
        score = 0;
        optionsDisabled.value = false;
    }

</script>

<template>
    <div class="question">
        <div class="question__details">
            <p>Question {{ questionCounter + 1 }}/{{ questions.length }}  </p>
        </div>
        <!-- Game over Modal -->
        <div class="modal fade" id="gameOverModal" tabindex="-1" aria-labelledby="gameOverModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header justify-content-center border border-0">
                        <h1 class="modal-title fs-5" id="gameOverModalLabel">Game Over!</h1>
                    </div>
                    <div class="modal-body">
                        <p class="text-center">You scored {{score}}</p>
                    </div>
                    <div class="modal-footer justify-content-center border border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="restart">Restart</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="sound__button__container">
            <button id="sound__icon__button" class="btn btn-info" @click="playSound">
                <!-- <img id="sound__icon" src="/loudspeaker.svg" width="50"/> -->
                 <svg id="loudspeaker_icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16">
<path fill="#000000" d="M11.243 12.993c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 2.047-2.047 2.047-5.378 0-7.425-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773c-0.146 0.146-0.338 0.22-0.53 0.22v0zM8.578 11.578c-0.192 0-0.384-0.073-0.53-0.22-0.293-0.293-0.293-0.768 0-1.061 1.267-1.267 1.267-3.329 0-4.596-0.293-0.293-0.293-0.768 0-1.061s0.768-0.293 1.061 0c1.852 1.852 1.852 4.865 0 6.718-0.146 0.146-0.338 0.22-0.53 0.22z"></path>
<path fill="#000000" d="M6.5 15c-0.13 0-0.258-0.051-0.354-0.146l-3.854-3.854h-1.793c-0.276 0-0.5-0.224-0.5-0.5v-5c0-0.276 0.224-0.5 0.5-0.5h1.793l3.854-3.854c0.143-0.143 0.358-0.186 0.545-0.108s0.309 0.26 0.309 0.462v13c0 0.202-0.122 0.385-0.309 0.462-0.062 0.026-0.127 0.038-0.191 0.038z"></path>
</svg>
            </button>
            <img src="/arrow.svg" width="50"/>
        </div>
        <Question :question="currentQuestion" :options-disabled="optionsDisabled" @option-selected="checkAnswer"/>
        <button
         class="btn"
         id="next__button" 
         @click="loadNextQuestion"
         :disabled="!optionsDisabled"
        >
         Next
        </button>
    </div>
    
</template>

<style scoped>
.question {
    display: grid;
    place-content: center;
}

.question__details {
    place-self: center;
    margin-bottom: 1rem;
    font-weight: 600;
}

#next__button {
    place-self: center;
    margin-top: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 1.25rem;
    background-color: greenyellow;
}

#sound__button__container {
    place-self: center;    
}

#sound__icon__button {
    margin-bottom: 1rem;
    padding-right: 0.25rem;
    border-radius: 1.75rem;
}

#sound__icon__button:focus {
    background-color: cyan;
    transition: background-color 2s;
}

#loudspeaker_icon {
    width: 30px;
    height: 30px;
}

@media (max-width: 376px) {
    #sound__button__container {
        margin-left: 1rem;
    } 
}
</style>