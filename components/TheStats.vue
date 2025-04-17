<template>
  <div class="h-20">
    <!-- v-if="props.time" -->
    <div v-if="props.time" class="flex gap-2">
      <p>wpm: {{ wpm }}</p>
      <p>rawWpm: {{ rawWpm }}</p>
      <p>time : {{ time }}</p>
      <p>acc: {{ accuracy }}</p>
      <p>mistakes: {{ mistakes }}</p>
    </div>
    <div v-else class="flex gap-2">
      <p>Wpm: {{ resultWpm }}</p>
      <p>RawWpm: {{ resultRawWpm }}</p>
      <p>Acc: {{ resultAccuracy }}</p>
      <p>Time: {{ resultTime }}s</p>
      <p>mistakes: {{ mistakes }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  inputHistory: string[];
  time: number;
  currentWordIndex: number;
}>();

const correctWordsHistory = computed(() => {
  return props.inputHistory.filter(
    (word, index) => word === props.text.split(' ')[index]
  );
});

const words = computed(() => {
  return props.text.split(' ');
});
const mistakes = computed(() => {
  let mistakes = 0;
  for (let i = 0; i < props.inputHistory.length; i++) {
    if (props.inputHistory[i].length < words.value[i].length) {
      mistakes += words.value[i].length - props.inputHistory[i].length;
    }

    for (let j = 0; j < props.inputHistory[i].length; j++) {
      if (props.inputHistory[i][j] !== words.value[i][j]) {
        mistakes += 1;
      }
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

const extraChars = computed(() => {
  let extra = 0;
  for (let i = 0; i < props.inputHistory.length; i++) {
    if (props.inputHistory[i].length > words.value[i].length) {
      extra += props.inputHistory[i].length - words.value[i].length;
    }
  }
  return extra;
});

const accuracy = computed(() => {
  const acc = Math.round(
    100 -
      (mistakes.value /
        (words.value.slice(0, props.inputHistory.length).join('').length +
          extraChars.value)) *
        100
  );
  return isNaN(acc) ? 0 : acc;
});


// === results ===
const resultWpm = ref(0);
function getResultWpm(){

}

const resultRawWpm = ref(0);
const resultTime = ref(0);
const resultAccuracy = ref(0);

function assignResults() {
  resultWpm.value = wpm.value;
  resultRawWpm.value = rawWpm.value;
  resultTime.value = props.time;
  resultAccuracy.value = accuracy.value;
}

// watch(
//   () => isTextEnds.value,
//   (newValue) => {
//     console.log('1');
//     if (newValue) {
//       assignResults();
//     }
//   }
// );

// поставить константное время
// watch(
//   () => props.inputHistory.length,
//   (newValue) => {
//     console.log(newValue);
//   }
// );

watch(
  () => wpm.value,
  (newValue) => {
    console.log(props.inputHistory);
  }
);
</script>
