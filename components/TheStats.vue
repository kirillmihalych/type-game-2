<template>
  <div>
    <p>wpm: {{ wpm }}</p>
    <p>rawWpm: {{ rawWpm }}</p>
    <p>time : {{ time }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  inputHistory: string[];
  time: number;
}>();
const { text, inputHistory, time } = toRefs(props);

const { wpm, rawWpm } = useWpm(text, inputHistory, time);

function useWpm(
  text: Ref<string>,
  inputHistory: Ref<string[]>,
  time: Ref<number>
) {
  const correctWordsHistory = computed(() => {
    return inputHistory.value.filter(
      (word, index) => word === text.value.split(' ')[index]
    );
  });

  const rawSpaces = computed(() => {
    return inputHistory.value.length;
  });

  const correctSpaces = computed(() => {
    return correctWordsHistory.value.length;
  });

  const charsNumber = computed(() => {
    return correctWordsHistory.value.join('').length / 5 + correctSpaces.value;
  });

  const charsNumberRaw = computed(() => {
    return inputHistory.value.join('').length / 5 + rawSpaces.value;
  });

  const timeNormalized = computed(() => {
    const timeNorm = 60 / time.value;
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

  return { rawWpm, wpm };
}
</script>
