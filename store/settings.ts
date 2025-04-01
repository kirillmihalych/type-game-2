export const useSettingsStore = defineStore(
  'settings',
  () => {
    const fontSize = ref('2.75');

    function setFontSize(value: string) {
      if (value.length > 0) {
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
