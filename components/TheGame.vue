<template>
  <div class="svg-bg h-full border-[1px] border-t-0 p-4 border-gray-400/35">
    <TheWords
      :text="text"
      :input="gameInput"
      :current-word-index="currentWordIndex"
      :current-char-index="currentCharIndex"
    />
    <input
      type="text"
      :value="gameInput"
      @input="onGameInputChange"
      class="border-2 border-orange-500 rounded-md outline-none"
    />
  </div>
</template>

<script setup lang="ts">
const text = ref("It's a dangerous business, Frodo!");
const gameInput = ref('');
const currentWordIndex = ref(0);

const currentCharIndex = computed(() => {
  return gameInput.value.length - 1;
});

function onGameInputChange(e: Event): void {
  const isSpace = (e as InputEvent).data === ' ';

  if (isSpace) {
    handleSpace();
  } else {
    setInputValue(e.target as HTMLInputElement);
  }
}

function handleSpace(): void {
  currentWordIndex.value += 1;
  gameInput.value = '';
}

function setInputValue(eventTarget: HTMLInputElement): void {
  gameInput.value = eventTarget.value;
}
</script>
