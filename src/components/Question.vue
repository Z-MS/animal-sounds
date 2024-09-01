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
    <div>
        <div>
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
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .option {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        background-color: orange;
        font-size: 1.15rem;
    }

    @media (min-width: 576px) {
        .options {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .selected {
        background-color: rgb(187, 127, 16);
    }

    .correct__option {
        background-color: lime
    }
</style>