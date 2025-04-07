<template>
  <div class="absolute bg-current rounded-md" :style="caretStyle"></div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';

const caretStore = useCaretStore();

const caretStyle = computed(() => {
  return {
    left: caretStore.caretPos.left + 'px',
    top: caretStore.caretPos.top + 'px',
    height: caretStore.caretHeight + 'px',
    width: caretStore.caretWidth + 'px',
  };
});
</script>
