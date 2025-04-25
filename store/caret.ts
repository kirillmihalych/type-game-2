import { useSettingsStore } from './settings';
import { TransitionPresets, useTransition } from '@vueuse/core';

interface Coords {
  left: number;
  top: number;
}

interface CharBounding {
  left: number;
  top: number;
  width: number;
  height: number;
}

export const useCaretStore = defineStore('caret', () => {
  const settings = useSettingsStore();

  const duration = computed(() => {
    return settings.theCaretPace === 'медленный'
      ? 150
      : settings.theCaretPace === 'умеренный'
      ? 100
      : settings.theCaretPace === 'быстрый'
      ? 75
      : 0;
  });
  const baseCaret = shallowRef([0, 0]);
  const caret = useTransition(baseCaret, {
    duration: duration,
    transition: TransitionPresets.linear,
  });

  const caretHeight = computed(() => {
    return settings.fontSize * 16 * 1.375;
  });
  const caretWidth = computed(() => {
    return settings.fontSize * 16 * 0.0675;
  });
  const wordsTopMargin = ref(0);

  function updateStartWordCoords(charCoords: Coords, parentCoords: Coords) {
    const newLeft = charCoords.left - parentCoords.left;
    let newTop = charCoords.top - parentCoords.top;
    if (newTop < 0) newTop = 0;

    if (newTop >= caretHeight.value * 2) {
      baseCaret.value = [newLeft, baseCaret.value[1]];
    } else {
      baseCaret.value = [newLeft, newTop];
    }
  }

  function updateCharCoords(
    bounding: CharBounding,
    parentCoords: Coords
  ): void {
    const newLeft = bounding.left - parentCoords.left + bounding.width;
    let newTop = bounding.top - parentCoords.top;

    // если слово переносится с линию на линию, то прокрутить
    // а курсор оставить на том же ряду
    if (newTop >= caretHeight.value * 2) {
      baseCaret.value = [newLeft, baseCaret.value[1]];
    } else if (newTop >= caretHeight.value && baseCaret.value[1] !== 0) {
      // нужно, чтобы переход со второго на третий не дёргался
      baseCaret.value = [newLeft, baseCaret.value[1]];
    } else {
      // нужно, чтобы переносить курсор с первого ряда
      baseCaret.value = [newLeft, newTop];
    }
  }

  function moveCaret(
    input: string,
    charBounding: CharBounding,
    parentCoords: Coords
  ) {
    const newTop = charBounding.top - parentCoords.top;
    if (newTop >= caretHeight.value * 2) {
      wordsTopMargin.value -= caretHeight.value;
    }

    console.log(charBounding);

    if (!input) {
      updateStartWordCoords(charBounding, parentCoords);
    } else {
      updateCharCoords(charBounding, parentCoords);
    }
  }

  function placeCaretStart() {
    baseCaret.value = [0, 0];
  }

  function adjustCaretPos() {
    const newLeft = baseCaret.value[0];
    const newTop = baseCaret.value[1] - caretHeight.value;
    baseCaret.value = [newLeft, newTop];
  }

  return {
    caret,
    caretHeight,
    caretWidth,
    moveCaret,
    placeCaretStart,
    adjustCaretPos,
    wordsTopMargin,
  };
});
