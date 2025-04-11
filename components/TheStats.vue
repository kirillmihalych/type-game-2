<template>
  <div class="h-20">
    <div v-if="props.time" class="flex gap-2">
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
  inputHistory: string[];
  time: number;
}>();

const correctWordsHistory = computed(() => {
  return props.inputHistory.filter(
    (word, index) => word === props.text.split(' ')[index]
  );
});

const mistakes = computed(() => {
  let mistakes = 0;
  const flatHistory = props.inputHistory.join(' ');
  for (let i = 0; i < flatHistory.length; i++) {
    if (flatHistory[i] !== props.text[i]) {
      mistakes += 1;
    }
  }
  return mistakes;
});

const rawSpaces = computed(() => {
  return props.inputHistory.length;
});

const correctSpaces = computed(() => {
  return correctWordsHistory.value.length;
});

const charsNumber = computed(() => {
  return (correctWordsHistory.value.join('').length + correctSpaces.value) / 5;
});

const charsNumberRaw = computed(() => {
  return (props.inputHistory.join('').length + rawSpaces.value) / 5;
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

const accuracy = computed(() => {
  const acc = Math.round(
    100 -
      (mistakes.value /
        (mistakes.value + props.inputHistory.join(' ').length)) *
        100
  );
  return isNaN(acc) ? 0 : acc;
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

watch(
  () => props.time,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      assignResults();
    }
  }
);
</script>
