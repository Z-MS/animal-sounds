<script setup>
import { ref, onMounted } from 'vue';
import { useQuestionsStore } from './stores/questions';
import { useUserStore } from './stores/user';
import QuizContainer from './components/QuizContainer.vue';

const userStore = useUserStore();
const questionStore = useQuestionsStore();
var gameStarted = ref(false);

onMounted(() => {
  userStore.setUserID();
});

</script>

<template>
    <div class="container">
      <main>
        <div v-if="!gameStarted" id="splash__screen">
          <p id="app__title">Animal Sounds</p>
          <button id="start__button" class="btn" @click="gameStarted = true">Start</button>
        </div>
        <div v-else>
          <QuizContainer
          :questions="questionStore.questions" 
          @generate-questions="questionStore.setQuestions"
          />      
        </div>
    </main>
  </div>
</template>

<style scoped>

  * {
    box-sizing: border-box;
  }

  main {
    display: grid;
    place-items: center;
    min-height: 70vh;
  }

  #splash__screen {
    display: grid;
  }

  #app__title {
    margin-bottom: 50px;
    font-size: 1.5rem;
  }

  #start__button {
    margin: 0 auto;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    font-size: 1.15rem;
    background-color: lawngreen;
    color: rgb(26, 65, 21);
  }
</style>