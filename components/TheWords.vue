<template>
  <div
    ref="words-wrapper"
    class="flex relative flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="{ fontSize: settings.fontSize + 'rem' }"
  >
    <TheCaret
      :char-list-bounding="charListBounding"
      :input="input"
      :current-char-index="props.currentCharIndex"
      :current-word-index="props.currentWordIndex"
      :wrapper-boundings="{ left: wrapperLeft, top: wrapperTop }"
    />
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard
        @get-char-bounding="setCharBounding"
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
import type { CharBounding } from './CharCard.vue';

const props = defineProps<{
  text: string;
  input: string;
  currentWordIndex: number;
  currentCharIndex: number;
}>();

const wordsWrapper = useTemplateRef('words-wrapper');
const { left: wrapperLeft, top: wrapperTop } = useElementBounding(wordsWrapper);
const settings = useSettingsStore();

const charListBounding = ref<CharBounding[][]>([]);

function setCharBounding(values: CharBounding[]): void {
  charListBounding.value.push(values);
}

function isWordActive(index: number): boolean {
  return index === props.currentWordIndex;
}

function isWordTyped(index: number): boolean {
  return index < props.currentWordIndex;
}

const words = computed(() => {
  return props.text.split(' ');
});
</script>
