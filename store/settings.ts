export type FontFamily = 'PT Mono' | 'PT Sans' | 'PT Serif';
export type GameDifficulty = 'стандартный' | 'сложный' | 'эксперт';

export const useSettingsStore = defineStore(
  'settings',
  () => {
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
      ],
    },
  }
);
