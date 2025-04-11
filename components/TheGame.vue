<template>
  <div class="svg-bg h-full border-[1px] border-t-0 p-4 border-gray-400/35">
    <TheStats :text="text" :input-history="inputHistory" :time="timer" />
    <button @click="resetGame">reset</button>
    <button @click="startTimer">start timer</button>
    <TheWords
      :text="text"
      :input="gameInput"
      :input-history="inputHistory"
      :current-word-index="currentWordIndex"
      :current-char-index="currentCharIndex"
    />
    <p>{{ inputHistory }}</p>
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
const inputHistory = ref<string[]>([]);

const currentCharIndex = computed(() => {
  return gameInput.value.length ? gameInput.value.length - 1 : 0;
});
const isInputExist = computed(() => {
  return gameInput.value.length > 0;
});

function onGameInputChange(e: Event): void {
  const isSpace = (e as InputEvent).data === ' ';

  if (isSpace && isInputExist.value) {
    handleSpace();
  } else {
    setInputValue(e.target as HTMLInputElement);
  }
}

function handleSpace(): void {
  currentWordIndex.value += 1;
  inputHistory.value.push(gameInput.value);
  gameInput.value = '';
}

function setInputValue(eventTarget: HTMLInputElement): void {
  gameInput.value = eventTarget.value;
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

function startGame() {
  isGameStarted.value = true;
}

function resetGame() {
  time.value = timer.value;
  gameInput.value = '';
  currentWordIndex.value = 0;
  isGameStarted.value = false;
  inputHistory.value = [];
  pauseTimer();
  resetTimer();
}

watch(isInputExist, (newValue) => {
  if (newValue) {
    startGame();
  }
});

watch(isGameStarted, (newValue) => {
  if (newValue) {
    startTimer();
  }
});

const isTextEnds = computed(() => {
  return currentWordIndex.value > text.value.split(' ').length - 1;
});

watch(
  () => isTextEnds.value,
  () => {
    console.log(isTextEnds.value);
    resetGame();
  }
);

onMounted(() => {
  pauseTimer();
  resetTimer();
});
</script>
