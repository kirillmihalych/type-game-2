<template>
  <div
    v-show="props.isInputFocused"
    class="absolute bg-current rounded-md w-[0.125rem]"
    :style="caretStyle"
  >
  </div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';

const props = defineProps<{
  isInputFocused: boolean;
}>();
const caretStore = useCaretStore();

const caretStyle = computed(() => {
  return {
    left: caretStore.caret[0] + 'px',
    top: caretStore.caret[1] + 'px',
    height: caretStore.caretHeight + 'px',
  };
});
</script>
