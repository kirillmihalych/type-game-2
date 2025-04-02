<template>
  <div class="svg-bg h-full border-[1px] border-t-0 p-4 border-gray-400/35">
    <TheWords
      :text="text"
      :input="gameInput"
      :current-word-index="currentWordIndex"
      :current-char-index="currentCharIndex"
    />
    <p>{{ gameInput }}</p>
    <p>{{ currentCharIndex }}</p>
    <input
      type="text"
      v-model="gameInput"
      class="border-2 border-orange-500 rounded-md outline-none"
    />
  </div>
</template>

<script setup lang="ts">
// "It's a dangerous business, Frodo!"
const text = ref('dangerous business');

const gameInput = ref('');
const currentWordIndex = ref(0);
const currentCharIndex = computed(() => {
  return gameInput.value.length - 1;
});
</script>
