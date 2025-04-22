export type FontFamily = 'PT Mono' | 'PT Sans' | 'PT Serif';
export type GameDifficulty = 'стандартный' | 'сложный' | 'эксперт';
export type PaceType = 'выкл' | 'медленный' | 'умеренный' | 'быстрый';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    // ============ typography ============
    const fontSize = ref(2);
    function setFontSize(value: string) {
      if (typeof value === 'string' && value) {
        fontSize.value = Number(value);
      }
    }
    const fontFamily = ref<FontFamily>('PT Mono');
    const fontFamilyList = ref<FontFamily[]>([
      'PT Mono',
      'PT Sans',
      'PT Serif',
    ]);
    const maxLineLength = ref(0);
    function setMaxLineLength(value: string) {
      if (typeof value === 'string' && value) {
        maxLineLength.value = Number(value);
      }
    }
    //  ============ gameplay ============
    const isFreedomMode = ref(false);
    function turnOnFreedomMode() {
      isFreedomMode.value = true;
    }
    function turnOffFreedomMode() {
      isFreedomMode.value = false;
    }
    const isStopOnError = ref(true);
    function turnOnStopOnError() {
      isStopOnError.value = true;
    }
    function turnOffStopOnError() {
      isStopOnError.value = false;
    }
    const gameDifficulties = ref<GameDifficulty[]>([
      'стандартный',
      'сложный',
      'эксперт',
    ]);
    const selectedGameDifficulty = ref<GameDifficulty>('стандартный');
    function setGameDifficulty(difficulty: GameDifficulty) {
      selectedGameDifficulty.value = difficulty;
    }

    // ============ caret ============
    const isTheCaretSmooth = ref(false);
    function turnOffTheCaretSmooth() {
      isTheCaretSmooth.value = false;
    }
    const paceTypes = ref<PaceType[]>([
      'выкл',
      'медленный',
      'умеренный',
      'быстрый',
    ]);
    const theCaretPace = ref<PaceType>('быстрый');
    function setTheCaretPace(paceType: PaceType) {
      if (!isTheCaretSmooth.value) {
        isTheCaretSmooth.value = true;
      }
      theCaretPace.value = paceType;
    }
    // === animation ===
    const isLineScrollSmooth = ref(true);
    function turnOnSmoothScroll() {
      isLineScrollSmooth.value = true;
    }

    function turnOffSmoothScroll() {
      isLineScrollSmooth.value = false;
    }

    return {
      fontSize,
      setFontSize,
      fontFamily,
      fontFamilyList,
      maxLineLength,
      setMaxLineLength,
      isFreedomMode,
      turnOnFreedomMode,
      turnOffFreedomMode,
      isStopOnError,
      turnOnStopOnError,
      turnOffStopOnError,
      gameDifficulties,
      selectedGameDifficulty,
      setGameDifficulty,
      isTheCaretSmooth,
      paceTypes,
      theCaretPace,
      setTheCaretPace,
      turnOffTheCaretSmooth,
      isLineScrollSmooth,
      turnOnSmoothScroll,
      turnOffSmoothScroll,
    };
  },
  {
    persist: {
      pick: [
        'fontSize',
        'fontFamily',
        'maxLineLength',
        'isFreedomMode',
        'isStopOnError',
        'selectedGameDifficulty',
        'isTheCaretSmooth',
        'isLineScrollSmooth',
        'theCaretPace',
      ],
    },
  }
);
