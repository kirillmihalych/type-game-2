export const useSettingsStore = defineStore(
  'settings',
  () => {
    const fontSize = ref('2.75');

    function setFontSize(value: string) {
      if (value) {
        fontSize.value = value;
      }
    }

    return { fontSize, setFontSize };
  },
  {
    persist: {
      pick: ['fontSize'],
    },
  }
);
