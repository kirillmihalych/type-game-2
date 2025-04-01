<template>
  <div
    class="flex flex-wrap leading-snug tracking-wide gap-x-[1ch]"
    :style="{ fontSize: settings.fontSize + 'rem' }"
  >
    <div v-for="(word, wordIdx) in words" :key="wordIdx" class="flex flex-wrap">
      <CharCard :word="word" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
const text = ref("It's a dangerous business, Frodo!");

const words = computed(() => {
  return text.value.split(' ');
});
</script>
