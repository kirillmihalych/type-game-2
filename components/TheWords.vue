<template>
  <div
    ref="words-wrapper"
    class="flex relative flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="{ fontSize: settings.fontSize + 'rem' }"
  >
    <div
      class="caret absolute h-[44px] w-1 bg-purple-600"
      :style="{
        left: leftCaretPos,
        top: topCaretPos,
      }"
    ></div>
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard
        @get-char-coordinates="setCharListCoordinates"
        :word="word"
        :input="props.input"
        :is-word-active="isWordActive(wordIdx)"
        :is-word-typed="isWordTyped(wordIdx)"
        :current-char-index="props.currentCharIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const props = defineProps<{
  text: string;
  input: string;
  currentWordIndex: number;
  currentCharIndex: number;
}>();

interface CharCoordinates {
  left: number;
  top: number;
}

const wordsWrapper = useTemplateRef('words-wrapper');
const { left: wrapperLeft, top: wrapperTop } = useElementBounding(wordsWrapper);
const settings = useSettingsStore();

// caret logic
const charListCoordinates = ref<CharCoordinates[][]>([]);
function setCharListCoordinates(values: CharCoordinates[]): void {
  charListCoordinates.value.push(values);
}
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
    left: charListCoordinates.value[props.currentWordIndex][
      props.currentCharIndex
    ].left,
    top:
      charListCoordinates.value[props.currentWordIndex][props.currentCharIndex]
        .top - wrapperTop.value,
  };
});
const startWordCoords = computed(() => {
  return {
    left:
      charListCoordinates.value[props.currentWordIndex][0].left -
      wrapperLeft.value,
    top:
      charListCoordinates.value[props.currentWordIndex][0].top -
      wrapperTop.value,
  };
});

function moveCaret() {
  if (!props.input) {
    caretStyle.value = startWordCoords.value;
  } else {
    caretStyle.value = nextCharCoords.value;
  }
}
// ========= end of caret logic =============

function isWordActive(index: number): boolean {
  return index === props.currentWordIndex;
}
function isWordTyped(index: number): boolean {
  return index < props.currentWordIndex;
}

const words = computed(() => {
  return props.text.split(' ');
});

watch(
  () => props.input,
  (input) => {
    console.log(input);
    moveCaret();
  }
);
</script>
