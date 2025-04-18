<template>
  <div class="h-20">
    <div v-if="isGameStarted" class="flex gap-2">
      <p>wpm: {{ wpm }}</p>
      <p>rawWpm: {{ rawWpm }}</p>
      <p>time : {{ time }}</p>
      <p>acc: {{ accuracy }}</p>
    </div>
    <div v-else class="flex gap-2">
      <p>Wpm: {{ resultWpm }}</p>
      <p>RawWpm: {{ resultRawWpm }}</p>
      <p>Acc: {{ resultAccuracy }}</p>
      <p>Time: {{ resultTime }}s</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  input: string;
  currHistory: string[];
  isGameStarted: boolean;
  time: number;
  currentWordIndex: number;
}>();

const emit = defineEmits<{
  onResultsSaved: [isResultsSaved: true];
}>();

const correctWordsHistory = computed(() => {
  return props.currHistory.filter(
    (word, index) => word === props.text.split(' ')[index]
  );
});

const words = computed(() => {
  return props.text.split(' ');
});

const rawSpaces = computed(() => {
  return props.currHistory.length;
});

const correctSpaces = computed(() => {
  return correctWordsHistory.value.length;
});

const charsNumber = computed(() => {
  return (correctWordsHistory.value.join('').length + correctSpaces.value) / 5;
});

const charsNumberRaw = computed(() => {
  return (props.currHistory.join('').length + rawSpaces.value) / 5;
});

const timeNormalized = computed(() => {
  const timeNorm = 60 / props.time;
  return !isFinite(timeNorm) ? 0 : timeNorm;
});

const rawWpm = computed(() => {
  const rawWpm = charsNumberRaw.value * timeNormalized.value;
  return isNaN(rawWpm) ? 0 : Math.round(rawWpm);
});

const wpm = computed(() => {
  const wpm = charsNumber.value * timeNormalized.value;
  return isNaN(wpm) ? 0 : Math.round(wpm);
});

const mistakes = ref(0);
watch(
  () => props.input,
  (newInputVal, oldInputVal) => {
    if (!newInputVal && props.currentWordIndex >= words.value.length - 1) {
      return;
    }

    const diff = newInputVal.slice(oldInputVal.length, newInputVal.length);
    const wordSnap = words.value[props.currentWordIndex].slice(
      oldInputVal.length,
      newInputVal.length
    );

    for (let i = 0; i < diff.length; i++) {
      if (diff[i] !== wordSnap[i]) {
        mistakes.value += 1;
      }
    }

    if (
      words.value[props.currentWordIndex - 1] &&
      diff === '' &&
      words.value[props.currentWordIndex - 1].length >
        props.currHistory[props.currentWordIndex - 1].length
    ) {
      mistakes.value += 1;
    }
  }
);

const accuracy = computed(() => {
  const totalChars = props.currHistory.join('').length;
  const spaces = props.currHistory.length;
  const acc = Math.round(
    100 - (mistakes.value / (totalChars + spaces + props.input.length)) * 100
  );
  return isNaN(acc) || !isFinite(acc) ? 0 : acc;
});

const resultWpm = ref(0);
const resultRawWpm = ref(0);
const resultTime = ref(0);
const resultAccuracy = ref(0);

function assignResults() {
  resultWpm.value = wpm.value;
  resultRawWpm.value = rawWpm.value;
  resultTime.value = props.time;
  resultAccuracy.value = accuracy.value;
}

const isTextEnds = computed(() => {
  return props.currentWordIndex >= props.text.split(' ').length;
});

watch(
  () => isTextEnds.value,
  (newValue) => {
    if (newValue) {
      assignResults();
      emit('onResultsSaved', true);
      mistakes.value = 0;
    }
  }
);
</script>
