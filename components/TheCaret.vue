<template>
  <div
    class="caret absolute h-[44px] w-1 bg-purple-600"
    :style="caretStyle"
  ></div>
</template>

<script setup lang="ts">
import type { CharCoordinates } from './CharCard.vue';

const props = defineProps<{
  charsCoords: CharCoordinates[][];
  input: string;
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBoundings: CharCoordinates;
}>();

const charListCoords = ref(props.charsCoords);

const caretPos = ref({
  left: 0,
  top: 0,
});
const caretStyle = computed(() => {
  return {
    left: caretPos.value.left + 'px',
    top: caretPos.value.top + 'px',
  };
});

const currentCharObj = computed(() => {
  const currentWord = charListCoords.value[props.currentWordIndex];
  return currentWord[props.currentCharIndex];
});
const currentCharCoords = computed(() => {
  return {
    left: currentCharObj.value.left,
    top: currentCharObj.value.top - props.wrapperBoundings.top,
  };
});
const startWordCoords = computed(() => {
  return {
    left: currentCharObj.value.left - props.wrapperBoundings.left,
    top: currentCharObj.value.top - props.wrapperBoundings.top,
  };
});

function moveCaret() {
  if (!props.input) {
    caretPos.value = startWordCoords.value;
  } else {
    caretPos.value = currentCharCoords.value;
  }
}

watch(
  () => props.input,
  () => {
    moveCaret();
  }
);
</script>
