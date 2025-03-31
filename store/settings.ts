export const useSettingsStore = defineStore(
  'settings',
  () => {
    const fontSize = ref(3);

    return { fontSize };
  },
  {
    persist: {
      pick: ['fontSize'],
    },
  }
);
