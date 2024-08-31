<script setup>
    const props = defineProps({
        question: Object,
        optionsDisabled: Boolean
    })
    const emit = defineEmits(['optionSelected']);
    
    function selectOption(option) {
        emit('optionSelected', option);  
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="options">
                <button
                 v-for="(option, index) in question.options"
                 :id="`option${index + 1}`" 
                 class="btn option"
                 :class="{ correct__option: optionsDisabled && option === question.answer }"
                 :disabled="optionsDisabled"
                 @click="selectOption(option)">
                    {{option}}
                </button>
            </div>
        </div>    
    </div>
</template>

<style scoped>
    .options {
        margin: 0 auto;
        width: 70%;
        justify-content: center;
    }

    .option {
        margin: 0.75rem;
        width: 100%;
        background-color: orange;
    }

    @media (min-width: 576px) {
        .options {
            padding-left: 10%;
        }

        .option {
            width: 100px;
            padding: 0.75rem;
        }
    }

    .selected {
        background-color: rgb(187, 127, 16);
    }

    .correct__option {
        background-color: lime
    }
</style>