<template>
  <div
    class="flex flex-wrap leading-snug gap-x-[0.5em]"
    style="font-size: 2.75rem"
  >
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard :word="word" />
    </div>
  </div>
</template>

<script setup lang="ts">
const text = ref("It's a dangerous business, Frodo!");

const words = computed(() => {
  return text.value.split(' ');
});
</script>
