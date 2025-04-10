<template>
  <div>
    <p>wpm: {{ wpm }}</p>
    <p>rawWpm: {{ rawWpm }}</p>
    <p>time : {{ time }}</p>
    <p>acc: {{ accuracy }}</p>
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
  return correctWordsHistory.value.join('').length / 5 + correctSpaces.value;
});

const charsNumberRaw = computed(() => {
  return props.inputHistory.join('').length / 5 + rawSpaces.value;
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
</script>
