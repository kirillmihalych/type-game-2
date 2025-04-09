<template>
  <div
    ref="words-wrapper"
    class="flex relative flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="wordWrapperStyle"
  >
    <TheCaret />
    <div v-for="(word, wordIdx) in words" :key="wordIdx">
      <WordCard
        :word="word"
        :word-index="wordIdx"
        :input="props.input"
        :current-word-index="props.currentWordIndex"
        :current-char-index="props.currentCharIndex"
        :wrapper-bounding="wrapperBounding"
      />
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
const wordWrapperStyle = reactive({
  fontSize: settings.fontSize + 'rem',
  maxWidth: settings.maxLineLength + 'ch',
});

const words = computed(() => {
  return props.text.split(' ');
});
</script>
