<template>
  <div
    class="caret absolute h-[44px] w-1 bg-purple-600"
    :style="{
      left: leftCaretPos,
      top: topCaretPos,
    }"
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

const caretStyle = ref({
  left: 0,
  top: 0,
});
const leftCaretPos = computed(() => {
  return caretStyle.value.left + 'px';
});
const topCaretPos = computed(() => {
  return caretStyle.value.top + 'px';
});
const nextCharCoords = computed(() => {
  return {
    left: charListCoords.value[props.currentWordIndex][props.currentCharIndex]
      .left,
    top:
      charListCoords.value[props.currentWordIndex][props.currentCharIndex].top -
      props.wrapperBoundings.top,
  };
});
const startWordCoords = computed(() => {
  return {
    left:
      charListCoords.value[props.currentWordIndex][0].left -
      props.wrapperBoundings.left,
    top:
      charListCoords.value[props.currentWordIndex][0].top -
      props.wrapperBoundings.top,
  };
});

function moveCaret() {
  if (!props.input) {
    caretStyle.value = startWordCoords.value;
  } else {
    caretStyle.value = nextCharCoords.value;
  }
}

watch(
  () => props.input,
  (input) => {
    console.log(input);
    moveCaret();
  }
);
</script>
