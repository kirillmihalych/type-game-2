<template>
  <div
    ref="words-wrapper"
    class="relative w-full overflow-hidden"
    :style="wrapperStyle"
  >
    <FocusWarning :is-input-focused="props.isInputFocused" />
    <TheCaret :is-input-focused="props.isInputFocused" />
    <div
      class="flex flex-wrap tracking-wide leading-snug gap-x-[1ch]"
      :class="!props.isInputFocused ? 'blur-sm' : 'blur-none'"
      :style="wordsListStyle"
    >
      <div v-for="(word, wordIdx) in words" :key="wordIdx">
        <WordCard
          :word="word"
          :word-index="wordIdx"
          :input="props.input"
          :input-history="inputHistory"
          :current-word-index="props.currentWordIndex"
          :current-char-index="props.currentCharIndex"
          :wrapper-bounding="wrapperBounding"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';
import { useSettingsStore } from '~/store/settings';

export interface WrapperBounding {
  left: number;
  top: number;
}

const props = defineProps<{
  text: string;
  input: string;
  inputHistory: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  isInputFocused: boolean;
}>();

const caretStore = useCaretStore();

const settings = useSettingsStore();
const wordsWrapper = useTemplateRef('words-wrapper');
const { left: wrapperLeft, top: wrapperTop } = useElementBounding(wordsWrapper);
const wrapperBounding = reactive({
  left: wrapperLeft,
  top: wrapperTop,
});

const ROWS_NUMBER = 3;
const maxLineWidth = computed(() => {
  return settings.maxLineLength === 0 ? '100%' : settings.maxLineLength + 'ch';
});
const wrapperStyle = computed(() => {
  return {
    height: caretStore.caretHeight * ROWS_NUMBER + 'px',
    fontSize: settings.fontSize + 'rem',
    maxWidth: maxLineWidth.value,
  };
});

const wordsListStyle = computed(() => {
  return {
    marginTop: caretStore.wordsTopMargin + 'px',
  };
});

const isStartPosition = computed(() => {
  return props.currentWordIndex === 0 && !props.input;
});
function resetStyles() {
  caretStore.wordsTopMargin = 0;
}
watchEffect(() => {
  if (isStartPosition.value) {
    resetStyles();
    caretStore.placeCaretStart();
  }
});

const words = computed(() => {
  return props.text.split(' ');
});
</script>
