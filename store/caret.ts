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
  const caretHeight = ref(0);
  const caretWidth = ref(2);

  const caretPos = ref<Coords>({
    left: 0,
    top: 0,
  });

  function calcCaretHeight(charHeight: number) {
    caretHeight.value = charHeight;
  }

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
    if (!input) {
      caretPos.value = getStartWordCoords(charBounding, parentCoords);
    } else {
      caretPos.value = getCharCoords(charBounding, parentCoords);
    }
  }

  return { caretPos, caretHeight, caretWidth, moveCaret, calcCaretHeight };
});
