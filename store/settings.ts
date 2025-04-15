export type FontFamily = 'PT Mono' | 'PT Sans' | 'PT Serif';

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

    return {
      fontSize,
      setFontSize,
      fontFamily,
      fontFamilyList,
      maxLineLength,
      isFreedomMode,
      turnOnFreedomMode,
      turnOffFreedomMode,
    };
  },
  {
    persist: {
      pick: ['fontSize', 'fontFamily', 'maxLineLength', 'isFreedomMode'],
    },
  }
);
