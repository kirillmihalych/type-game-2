<template>
  <div
    ref="chars"
    v-for="(char, charIdx) in props.word"
    :key="charIdx"
    class="flex items-center gap-[2px] justify-center"
    :class="
      isCharCorrect(charIdx) && props.isWordActive
        ? 'text-green-500'
        : !isCharCorrect(charIdx) && props.isWordActive && isCharTyped(charIdx)
        ? 'text-red-500'
        : props.isWordTyped
        ? 'text-green-500'
        : 'text-gray-950/50'
    "
  >
    {{ char }}
  </div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';
import type { WrapperBounding } from './TheWords.vue';

const props = defineProps<{
  word: string;
  input: string;
  isWordActive: boolean;
  isWordTyped: boolean;
  isExtra: boolean;
  wordIndex: number;
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBounding: WrapperBounding;
}>();

const caretStore = useCaretStore();

export interface CharBounding {
  left: number;
  top: number;
  height: number;
  width: number;
}

const chars = useTemplateRef('chars');

function isCharTyped(index: number): boolean {
  return index < props.currentCharIndex;
}
function isCharCorrect(index: number): boolean {
  return props.input[index] === props.word[index];
}

const charBoundingsList = ref<CharBounding[] | undefined>([]);

function getCharBoundingTemp() {
  charBoundingsList.value = chars.value?.map((char): CharBounding => {
    return {
      left: char.getBoundingClientRect().left,
      top: char.getBoundingClientRect().top,
      width: char.getBoundingClientRect().width,
      height: char.getBoundingClientRect().height,
    };
  });
}

const isCurrentWord = computed(() => {
  return props.wordIndex === props.currentWordIndex;
});

watch(
  () => props.input,
  () => {
    if (isCurrentWord.value && !props.isExtra) {
      caretStore.moveCaret(
        props.input,
        (charBoundingsList.value as CharBounding[])[props.currentCharIndex],
        props.wrapperBounding
      );
    }
  }
);

onMounted(() => {
  getCharBoundingTemp();
});
</script>
