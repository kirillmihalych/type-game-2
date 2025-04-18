export type FontFamily = 'PT Mono' | 'PT Sans' | 'PT Serif';
export type GameDifficulty = 'стандартный' | 'сложный' | 'эксперт';
export type PaceType = 'медленный' | 'умеренный' | 'быстрый';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    // ============ typography ============
    const fontSize = ref('2.75');
    const fontFamily = ref<FontFamily>('PT Mono');
    const fontFamilyList = ref<FontFamily[]>([
      'PT Mono',
      'PT Sans',
      'PT Serif',
    ]);
    const maxLineLength = ref(30);
    function setFontSize(value: string) {
      if (value) {
        fontSize.value = value;
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
    const isStopOnError = ref(false);
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
    const paceTypes = ref<PaceType[]>(['медленный', 'умеренный', 'быстрый']);
    const theCaretPace = ref<PaceType>('быстрый');
    function setTheCaretPace(paceType: PaceType) {
      if (!isTheCaretSmooth.value) {
        isTheCaretSmooth.value = true;
      }
      theCaretPace.value = paceType;
    }

    return {
      fontSize,
      setFontSize,
      fontFamily,
      fontFamilyList,
      maxLineLength,
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
        'theCaretPace',
      ],
    },
  }
);
