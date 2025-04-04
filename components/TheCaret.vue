<template>
  <div class="absolute bg-current rounded-md" :style="caretStyle"></div>
</template>

<script setup lang="ts">
import type { CharBounding } from './CharCard.vue';

interface WrapperBounding {
  left: number;
  top: number;
}

const props = defineProps<{
  charListBounding: CharBounding[][];
  input: string;
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBoundings: WrapperBounding;
}>();

const charBoundings = ref(props.charListBounding);

const caretPos = ref({
  left: 0,
  top: 0,
});
const caretHeight = ref(0);
const caretWidth = computed(() => {
  return caretHeight.value * 0.0675;
});
const caretStyle = computed(() => {
  return {
    left: caretPos.value.left + 'px',
    top: caretPos.value.top + 'px',
    height: caretHeight.value + 'px',
    width: caretWidth.value + 'px',
  };
});

const currentCharObj = computed(() => {
  const currentWord = charBoundings.value[props.currentWordIndex];
  return currentWord[props.currentCharIndex];
});
const currentCharCoords = computed(() => {
  return {
    left:
      currentCharObj.value.left -
      props.wrapperBoundings.left +
      currentCharObj.value.width -
      caretWidth.value,
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

onUpdated(() => {
  caretHeight.value = charBoundings.value[0][0].height;
});
</script>
