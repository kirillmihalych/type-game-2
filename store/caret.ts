import { useSettingsStore } from './settings';

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

  const caretHeight = computed(() => {
    return Number(settings.fontSize) * 16 * 1.375;
  });
  const caretWidth = computed(() => {
    return Number(settings.fontSize) * 16 * 0.0675;
  });

  const caretPos = ref<Coords>({
    left: 0,
    top: 0,
  });

  function getStartWordCoords(charCoords: Coords, parentCoords: Coords) {
    return {
      left: charCoords.left - parentCoords.left,
      top: charCoords.top - parentCoords.top,
    };
  }

  function getCharCoords(bounding: CharBounding, parentCoords: Coords): Coords {
    return {
      left: bounding.left - parentCoords.left + bounding.width,
      top: bounding.top - parentCoords.top,
    };
  }

  function moveCaret(
    input: string,
    charBounding: CharBounding,
    parentCoords: Coords
  ) {
    console.log(parentCoords);
    if (!input) {
      caretPos.value = getStartWordCoords(charBounding, parentCoords);
    } else {
      caretPos.value = getCharCoords(charBounding, parentCoords);
    }
  }

  return { caretPos, caretHeight, caretWidth, moveCaret };
});
