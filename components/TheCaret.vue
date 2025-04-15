<template>
  <div
    class="absolute bg-current rounded-md"
    :class="[
      { ['transition-[left,top]']: settings.isTheCaretSmooth },
      settings.theCaretPace === 'быстрый'
        ? 'duration-75'
        : settings.theCaretPace === 'умеренный'
        ? 'duration-100'
        : 'duration-150',
    ]"
    :style="caretStyle"
  ></div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';
import { useSettingsStore } from '~/store/settings';

const caretStore = useCaretStore();
const settings = useSettingsStore();

const caretStyle = computed(() => {
  return {
    left: caretStore.caretPos.left + 'px',
    top: caretStore.caretPos.top + 'px',
    height: caretStore.caretHeight + 'px',
    width: caretStore.caretWidth + 'px',
  };
});
</script>
