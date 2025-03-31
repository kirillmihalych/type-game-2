export const useSettingsStore = defineStore(
  'settings',
  () => {
    const fontSize = ref('2.75');

    function setFontSize(selectedFontSize: string) {
      fontSize.value = selectedFontSize;
    }

    return { fontSize, setFontSize };
  },
  {
    persist: {
      pick: ['fontSize'],
    },
  }
);
