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

    function setFontSize(value: string) {
      if (value) {
        fontSize.value = value;
      }
    }

    return { fontSize, setFontSize, fontFamily, fontFamilyList };
  },
  {
    persist: {
      pick: ['fontSize'],
    },
  }
);
