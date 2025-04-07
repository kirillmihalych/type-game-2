<template>
  <div
    ref="words-wrapper"
    class="flex relative flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="wordWrapperStyle"
  >
    <TheCaret />
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard
        :word="word"
        :input="props.input"
        :is-word-active="isWordActive(wordIdx)"
        :is-word-typed="isWordTyped(wordIdx)"
        :is-extra="isExtra"
        :word-index="wordIdx"
        :current-word-index="props.currentWordIndex"
        :current-char-index="props.currentCharIndex"
        :wrapper-bounding="wrapperBounding"
      />
      <div v-if="isExtra && isCurrentWord(wordIdx)" class="flex items-center">
        <ExtraChar
          :extra-chars="extraChars"
          :input="props.input"
          :wrapper-boundings="wrapperBounding"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

export interface WrapperBounding {
  left: number;
  top: number;
}

const props = defineProps<{
  text: string;
  input: string;
  currentWordIndex: number;
  currentCharIndex: number;
}>();

const settings = useSettingsStore();
const wordsWrapper = useTemplateRef('words-wrapper');
const { left: wrapperLeft, top: wrapperTop } = useElementBounding(wordsWrapper);
const wrapperBounding = reactive({
  left: wrapperLeft,
  top: wrapperTop,
});
const wordWrapperStyle = reactive({ fontSize: settings.fontSize + 'rem' });

function isWordActive(index: number): boolean {
  return index === props.currentWordIndex;
}

function isWordTyped(index: number): boolean {
  return index < props.currentWordIndex;
}

const words = computed(() => {
  return props.text.split(' ');
});

function isCurrentWord(index: number) {
  return props.currentWordIndex === index;
}

// === extra ===
const isExtra = computed(() => {
  return props.input.length > words.value[props.currentWordIndex].length;
});
const extraChars = computed(() => {
  return props.input.slice(
    words.value[props.currentWordIndex].length,
    props.input.length
  );
});
// === extra ===
</script>
