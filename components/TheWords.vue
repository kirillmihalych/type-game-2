<template>
  <div
    class="flex flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="{ fontSize: settings.fontSize + 'rem' }"
  >
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard
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

const settings = useSettingsStore();

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
