<template>
  <div class="flex flex-wrap">
    <div
      ref="chars"
      v-for="(char, charIdx) in props.word"
      :key="charIdx"
      class="flex items-center gap-[2px] justify-center"
      :class="
        colorCorrectChar(charIdx) || colorWordTyped
          ? 'text-green-500'
          : colorErrorChar(charIdx)
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
  currentWordIndex: number;
  currentCharIndex: number;
  wrapperBounding: WrapperBounding;
}>();
const { input, word } = toRefs(props);

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

const isCurrentWord = computed(() => {
  return props.wordIndex === props.currentWordIndex;
});
const colorWordTyped = computed(() => {
  return props.wordIndex < props.currentWordIndex;
});

function isCharTyped(index: number): boolean {
  return index <= props.currentCharIndex;
}
function isCharCorrect(index: number): boolean {
  return props.input[index] === props.word[index];
}

function colorCorrectChar(index: number) {
  if (isCurrentWord.value && props.input) {
    return isCharTyped(index) && isCharCorrect(index);
  }
}
function colorErrorChar(index: number) {
  if (isCurrentWord.value && props.input) {
    return isCharTyped(index) && !isCharCorrect(index);
  }
}

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
</script>
