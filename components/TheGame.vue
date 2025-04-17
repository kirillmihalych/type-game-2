<template>
  <div class="grid justify-center items-start h-full p-4">
    <TheStats
      :text="text"
      :input-history="inputHistory"
      :time="timer"
      :current-word-index="currentWordIndex"
    />
    <TheWords
      @click="setFocusToInput"
      :text="text"
      :input="gameInput"
      :is-input-focused="focused"
      :input-history="inputHistory"
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
      class="p-2 border-2 rounded-md border-black/25 focus:border-black outline-none transition-colors duration-300"
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
const text = ref("It's a dangerous business, Frodo!");
const gameInput = ref('');
const currentWordIndex = ref(0);
const inputHistory = ref<string[]>([]);

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
    if (inputHistory.value[currentWordIndex.value] === ' ') {
      gameInput.value = '_';
    } else {
      gameInput.value = inputHistory.value[currentWordIndex.value];
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

  if (inputHistory.value[currentWordIndex.value]) {
    inputHistory.value[currentWordIndex.value] = gameInput.value;
  } else {
    inputHistory.value.push(gameInput.value);
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

const time = ref(0);
const isGameStarted = ref(false);

function getQuote() {
  return quotes[Math.floor(Math.random() * (quotes.length - 1))];
}

function startGame() {
  isGameStarted.value = true;
}

function resetGame() {
  // text.value = getQuote();
  console.log(timer.value, inputHistory.value);
  gameInput.value = '';
  currentWordIndex.value = 0;
  isGameStarted.value = false;
  pauseTimer();
}

watch(isInputExist, (newValue) => {
  if (newValue) {
    startGame();
  }
});

watch(isGameStarted, (newValue) => {
  if (newValue) {
    inputHistory.value = [];
    resetTimer();
    startTimer();
  }
});

const isTextEnds = computed(() => {
  return currentWordIndex.value === text.value.split(' ').length;
});

watch(
  () => isTextEnds.value,
  (newValue) => {
    if (newValue) {
      resetGame();
    }
  }
);

onMounted(() => {
  pauseTimer();
  resetTimer();
  resetGame();
});
</script>
