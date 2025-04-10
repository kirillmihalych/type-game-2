<template>
  <div class="flex flex-wrap">
    <div
      ref="chars"
      v-for="(char, charIdx) in props.word"
      :key="charIdx"
      class="flex items-center gap-[2px] justify-center"
      :class="
        colorCorrectChar(char, charIdx)
          ? 'text-green-500'
          : colorErrorChar(char, charIdx)
          ? 'text-red-500'
          : 'text-gray-950/50'
      "
    >
      {{ char }}
    </div>
    <div v-if="isExtra && isCurrentWord" class="flex items-center">
      <div ref="extra" v-for="(extra, index) in extraChars" :key="index">
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
  input: string;
  inputHistory: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBounding: WrapperBounding;
}>();
const {
  input,
  word,
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

const chars = useTemplateRef('chars');
const { charBoundings } = useChars(chars);

const extra = useTemplateRef('extra');
const { isExtra, extraChars } = useExtra(input, word);

const { colorCorrectChar, colorErrorChar } = useCharColor(
  word,
  wordIndex,
  input,
  inputHistory,
  currentWordIndex,
  currentCharIndex
);

const isCurrentWord = computed(() => {
  return props.wordIndex === props.currentWordIndex;
});

watch(
  () => props.input,
  () => {
    if (isCurrentWord.value && !isExtra.value && charBoundings.value) {
      caretStore.moveCaret(
        props.input,
        charBoundings.value[props.currentCharIndex],
        props.wrapperBounding
      );
    }
  }
);
onUpdated(() => {
  if (extra.value && extra.value.length) {
    caretStore.moveCaret(
      props.input,
      extra.value[extra.value.length - 1].getBoundingClientRect(),
      props.wrapperBounding
    );
  }
});

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

  return { charBoundings };
}

function useExtra(input: Ref<string>, word: Ref<string>) {
  const isExtra = computed(() => {
    return input.value.length > word.value.length;
  });
  const extraChars = computed(() => {
    return input.value.slice(word.value.length, input.value.length);
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
