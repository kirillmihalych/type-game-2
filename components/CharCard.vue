<template>
  <div
    v-for="(char, charIdx) in props.word"
    :key="charIdx"
    class="flex items-center justify-center"
  >
    {{ char }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  word: string;
}>();
</script>