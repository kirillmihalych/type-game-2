<template>
  <div
    class="dark:bg-neutral-900 dark:text-white"
    :class="[
      settings.fontFamily === 'PT Mono'
        ? 'font-mono'
        : settings.fontFamily === 'PT Serif'
        ? 'font-serif'
        : 'font-sans',
    ]"
  >
    <TheNav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from './store/settings';

const settings = useSettingsStore();
</script>
