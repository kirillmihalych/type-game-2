<template>
  <div class="grid gap-4 mt-[75px]">
    <TheStats
      :text="text"
      :input="gameInput"
      :curr-history="currHistory"
      :is-game-started="isGameStarted"
      @on-results-saved="resetGame"
      :time="timer"
      :current-word-index="currentWordIndex"
    />
    <TheWords
      @click="setFocusToInput"
      :text="text"
      :input="gameInput"
      :is-input-focused="focused"
      :input-history="currHistory"
      :current-word-index="currentWordIndex"
      :current-char-index="currentCharIndex"
    />
    <input
      ref="input"
      type="text"
      :value="gameInput"
      @input="onGameInputChange"
      @keydown.delete="backspaceToPrevious"
      maxlength="20"
      class="absolute bottom-0 right-0 opacity-0 size[1px]"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';
import { useFocus } from '@vueuse/core';
import { quotes } from '~/assets/quotes';

const input = useTemplateRef<HTMLInputElement>('input');
const { focused } = useFocus(input);
function setFocusToInput() {
  focused.value = true;
}

const settings = useSettingsStore();
const text = ref(
  "Don't measure yourself by what you have accomplished, but by what you should have accomplished with your ability."
);
const gameInput = ref('');
const currentWordIndex = ref(0);
const currHistory = ref<string[]>([]);

const currentCharIndex = computed(() => {
  return gameInput.value.length ? gameInput.value.length - 1 : 0;
});

const isInputExist = computed(() => {
  return gameInput.value.length > 0;
});

const isCharCorrect = computed(() => {
  const inputedChar = gameInput.value
    ? gameInput.value[currentCharIndex.value]
    : null;
  const currentChar =
    currentWordIndex.value < text.value.split(' ').length
      ? text.value.split(' ')[currentWordIndex.value][currentCharIndex.value]
      : null;
  return inputedChar === currentChar;
});

function onGameInputChange(e: Event): void {
  const isSpace = (e as InputEvent).data === ' ';
  const isBackToPrevious = gameInput.value === ' ' && !isSpace;

  if (settings.isStopOnError && !isCurrentWordCorrect.value && isSpace) {
    gameInput.value += '_';
    return;
  }

  if (isBackToPrevious) {
    // если слово состоит только из пробела,
    // его надо заменить на "_", чтобы избежать багов с реальным space
    if (currHistory.value[currentWordIndex.value] === ' ') {
      gameInput.value = '_';
    } else if (!currHistory.value[currentWordIndex.value]) {
      gameInput.value = '';
    } else {
      gameInput.value = currHistory.value[currentWordIndex.value];
    }
    return;
  }

  if (isSpace && isInputExist.value) {
    handleSpace();
  } else {
    gameInput.value = (e.target as HTMLInputElement).value;
  }

  if (
    !isCharCorrect.value &&
    settings.selectedGameDifficulty === 'эксперт' &&
    isInputExist.value
  ) {
    resetGame();
    return;
  }
}

function backspaceToPrevious() {
  if (settings.isFreedomMode) {
    if (currentWordIndex.value > 0 && !gameInput.value) {
      gameInput.value = ' ';
      currentWordIndex.value -= 1;
    }
  }
}

const isCurrentWordCorrect = computed(() => {
  const words = text.value.split(' ');
  const currentWord = words[currentWordIndex.value];
  return currentWord === gameInput.value;
});

function handleSpace(): void {
  if (
    !isCurrentWordCorrect.value &&
    settings.selectedGameDifficulty === 'сложный'
  ) {
    resetGame();
    return;
  }

  if (currHistory.value[currentWordIndex.value]) {
    currHistory.value[currentWordIndex.value] = gameInput.value;
  } else {
    currHistory.value.push(gameInput.value);
  }

  currentWordIndex.value += 1;
  gameInput.value = '';
}

const {
  counter: timer,
  reset: resetTimer,
  pause: pauseTimer,
  resume: startTimer,
} = useInterval(1000, {
  controls: true,
  immediate: true,
});

const isGameStarted = ref(false);

function getQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function startGame() {
  isGameStarted.value = true;
}

function resetGame() {
  gameInput.value = '';
  currentWordIndex.value = 0;
  isGameStarted.value = false;
  pauseTimer();
  text.value = getQuote();
  currHistory.value = [];
}

watch(isInputExist, (newValue) => {
  if (newValue) {
    startGame();
  }
});

watch(isGameStarted, (newValue) => {
  if (newValue) {
    resetTimer();
    startTimer();
  }
});

onMounted(() => {
  pauseTimer();
  resetTimer();
  resetGame();
});
</script>
