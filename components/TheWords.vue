<template>
  <div
    ref="words-wrapper"
    class="relative overflow-hidden"
    :style="wrapperStyle"
  >
    <div
      v-show="!props.isInputFocused"
      class="absolute size-full flex items-center justify-center z-10 text-black"
    >
      <p>Out of focus</p>
    </div>
    <TheCaret :is-input-focused="props.isInputFocused" />
    <div
      class="flex flex-wrap leading-snug tracking-wide gap-x-[1ch]"
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
const rowHeight = ref(caretStore.caretHeight);

const settings = useSettingsStore();
const wordsWrapper = useTemplateRef('words-wrapper');
const { left: wrapperLeft, top: wrapperTop } = useElementBounding(wordsWrapper);
const wrapperBounding = reactive({
  left: wrapperLeft,
  top: wrapperTop,
});

const ROWS_NUMBER = 3;
const wrapperStyle = computed(() => {
  return {
    height: rowHeight.value * ROWS_NUMBER + 'px',
    fontSize: settings.fontSize + 'rem',
    maxWidth: settings.maxLineLength + 'ch',
  };
});

const wordsTopMargin = ref(0);
const wordsListStyle = computed(() => {
  return {
    marginTop: wordsTopMargin.value + 'px',
  };
});

const isCaretOnThirdRow = computed(() => {
  return caretStore.caretPos.top === rowHeight.value * 2;
});
function scrollRows() {
  wordsTopMargin.value -= rowHeight.value;
}
function adjustCaretPos() {
  caretStore.caretPos.top -= caretStore.caretHeight;
}
watchEffect(() => {
  if (isCaretOnThirdRow.value) {
    scrollRows();
    adjustCaretPos();
  }
});

const isStartPosition = computed(() => {
  return props.currentWordIndex === 0 && !props.input;
});
function resetStyles() {
  wordsTopMargin.value = 0;
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
