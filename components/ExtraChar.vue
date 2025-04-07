<template>
  <div ref="extra" v-for="(extra, index) in props.extraChars" :key="index">
    {{ extra }}
  </div>
</template>

<script setup lang="ts">
import type { WrapperBounding } from './TheWords.vue';
import { useCaretStore } from '~/store/caret';

const props = defineProps<{
  extraChars: string;
  input: string;
  wrapperBoundings: WrapperBounding;
}>();

const extra = useTemplateRef('extra');
const caretStore = useCaretStore();

onMounted(() => {
  if (extra.value) {
    caretStore.moveCaret(
      props.input,
      extra.value[extra.value.length - 1].getBoundingClientRect(),
      props.wrapperBoundings
    );
  }
});

onUpdated(() => {
  if (extra.value) {
    caretStore.moveCaret(
      props.input,
      extra.value[extra.value.length - 1].getBoundingClientRect(),
      props.wrapperBoundings
    );
  }
});
</script>
