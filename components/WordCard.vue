<template>
  <div class="flex flex-wrap">
    <div
      :ref="(el) => getCharFromDOM(el, charIdx)"
      v-for="(char, charIdx) in props.word"
      :key="charIdx"
      class="flex items-center gap-[2px] justify-center"
      :class="
        colorCorrectChar(char, charIdx)
          ? 'text-green-500'
          : colorErrorChar(char, charIdx)
          ? 'text-red-500'
          : ' text-gray-950/50 dark:text-white/50'
      "
    >
      {{ char }}
    </div>
    <div v-if="isExtra" class="flex flex-wrap items-center">
      <div
        :ref="
          (el) => {
            if (el) {
              extraDom[index] = el;
            } else {
              extraDom = extraDom.filter((char, idx) => idx !== index);
            }
          }
        "
        v-for="(extra, index) in extraChars"
        :key="index"
      >
        {{ extra }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCaretStore } from '~/store/caret';
import type { WrapperBounding } from './TheWords.vue';
import type { ShallowRef } from 'vue';

const props = defineProps<{
  word: string;
  wordIndex: number;
  wordList: HTMLDivElement | null;
  input: string;
  inputHistory: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBounding: WrapperBounding;
}>();
const {
  input,
  word,
  wordList,
  wordIndex,
  inputHistory,
  currentWordIndex,
  currentCharIndex,
} = toRefs(props);

export interface CharBounding {
  left: number;
  top: number;
  height: number;
  width: number;
}

const caretStore = useCaretStore();

const chars = ref<any[]>([]);

function getCharFromDOM(
  el: Element | globalThis.ComponentPublicInstance | null,
  charIdx: number
) {
  if (el) {
    chars.value[charIdx] = el;
  } else {
    chars.value = chars.value.filter((char, idx) => idx === charIdx);
  }
}

const { charBoundings } = useChars(chars);

const extraDom = ref<any[]>([]);
const { isExtra, extraChars } = useExtra(
  input,
  word,
  wordIndex,
  currentWordIndex,
  inputHistory
);

const { colorCorrectChar, colorErrorChar } = useCharColor(
  word,
  wordIndex,
  input,
  inputHistory,
  currentWordIndex,
  currentCharIndex
);

watch(
  () => props.input,
  () => {
    moveCaretText();
  }
);

const isCurrentWord = computed(() => {
  return props.wordIndex === props.currentWordIndex;
});

function moveCaretText() {
  if (isCurrentWord.value && !isExtra.value && charBoundings.value) {
    const charCoords = charBoundings.value[props.currentCharIndex];
    caretStore.moveCaret(props.input, charCoords, props.wrapperBounding);
  }
}

watch(
  () => extraChars.value,
  async () => {
    await nextTick();
    moveCaretExtra();
  },
  { immediate: true }
);

function moveCaretExtra() {
  if (extraDom.value.length) {
    console.log(extraDom.value, extraDom.value[extraDom.value.length - 1]);
    const extraCoords =
      extraDom.value[extraDom.value.length - 1].getBoundingClientRect();
    caretStore.moveCaret(props.input, extraCoords, props.wrapperBounding);
  }
}

function useChars(charRefs: Readonly<ShallowRef<HTMLDivElement[] | null>>) {
  const charBoundings = ref<CharBounding[] | undefined>([]);

  function getCharBoundings() {
    charBoundings.value = charRefs.value?.map((char: any): CharBounding => {
      return {
        left: char.getBoundingClientRect().left,
        top: char.getBoundingClientRect().top,
        width: char.getBoundingClientRect().width,
        height: char.getBoundingClientRect().height,
      };
    });
  }

  onMounted(() => {
    getCharBoundings();
  });

  onUpdated(() => {
    getCharBoundings();
  });

  watchEffect(() => {
    if (props.wrapperBounding.top || caretStore.wordsTopMargin) {
      getCharBoundings();
    }
  });

  useEventListener(wordList, 'transitionstart', () => {
    getCharBoundings();
  });

  useEventListener(wordList, 'transitionend', () => {
    getCharBoundings();
  });

  return { charBoundings };
}

function useExtra(
  input: Ref<string>,
  word: Ref<string>,
  wordIndex: Ref<number>,
  currentWordIndex: Ref<number>,
  inputHistory: Ref<string[]>
) {
  const isCurrentWord = computed(() => {
    return wordIndex.value === currentWordIndex.value;
  });
  const isExtra = computed(() => {
    const typedWordLength = inputHistory.value[wordIndex.value]
      ? inputHistory.value[wordIndex.value].length
      : 0;
    return isCurrentWord.value
      ? input.value.length > word.value.length
      : typedWordLength > word.value.length;
  });
  const extraChars = computed(() => {
    const typedExtra = inputHistory.value[wordIndex.value]
      ? inputHistory.value[wordIndex.value].slice(
          word.value.length,
          inputHistory.value[wordIndex.value].length
        )
      : '';
    return isCurrentWord.value
      ? input.value.slice(word.value.length, input.value.length)
      : typedExtra;
  });

  return { isExtra, extraChars };
}

function useCharColor(
  word: Ref<string>,
  wordIndex: Ref<number>,
  input: Ref<string>,
  inputHistory: Ref<string[]>,
  currentWordIndex: Ref<number>,
  currentCharIndex: Ref<number>
) {
  const isCurrentWord = computed(() => {
    return wordIndex.value === currentWordIndex.value;
  });
  const isWordTyped = computed(() => {
    return wordIndex.value < currentWordIndex.value;
  });

  function isCharTyped(index: number): boolean {
    return index <= currentCharIndex.value;
  }

  function isCharCorrect(index: number): boolean {
    return input.value[index] === word.value[index];
  }

  function colorCorrectChar(char: string, index: number) {
    if (isWordTyped.value) {
      return inputHistory.value[wordIndex.value][index] === char;
    }
    if (isCurrentWord.value && input.value) {
      return isCharTyped(index) && isCharCorrect(index);
    }
  }

  function colorErrorChar(char: string, index: number) {
    if (isWordTyped.value) {
      const historyChar = inputHistory.value[wordIndex.value][index];
      return historyChar !== char && historyChar !== undefined;
    }
    if (isCurrentWord.value && input.value) {
      return isCharTyped(index) && !isCharCorrect(index);
    }
  }

  return { colorCorrectChar, colorErrorChar };
}
</script>
