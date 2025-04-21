<template>
  <div
    v-show="props.isInputFocused"
    class="absolute bg-current rounded-md w-[0.125rem]"
    :class="[
      { ['transition-[left,top]']: settings.isTheCaretSmooth },
      settings.isTheCaretSmooth && settings.theCaretPace === 'быстрый'
        ? 'duration-75'
        : settings.isTheCaretSmooth && settings.theCaretPace === 'умеренный'
        ? 'duration-100'
        : settings.isTheCaretSmooth && settings.theCaretPace === 'медленный'
        ? 'duration-150'
        : '',
    ]"
    :style="caretStyle"
  ></div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';
import { useSettingsStore } from '~/store/settings';

const props = defineProps<{
  isInputFocused: boolean;
}>();
const caretStore = useCaretStore();
const settings = useSettingsStore();

const caretStyle = computed(() => {
  return {
    left: caretStore.caretPos.left + 'px',
    top: caretStore.caretPos.top + 'px',
    height: caretStore.caretHeight + 'px',
  };
});
</script>
