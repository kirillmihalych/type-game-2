<template>
  <div
    v-for="(char, charIdx) in props.word"
    :key="charIdx"
    class="flex items-center justify-center"
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
const props = defineProps<{
  word: string;
  input: string;
  isWordActive: boolean;
  isWordTyped: boolean;
  currentCharIndex: number;
}>();

function isCharTyped(index: number): boolean {
  return index <= props.currentCharIndex;
}
function isCharCorrect(index: number): boolean {
  return props.input[index] === props.word[index];
}
</script>
