<template>
  <div class="p-4">
    <h2 class="text-2xl text-gray-950">Настройки</h2>
    <section>
      <h3 class="text-lg">Типография</h3>
      <form>
        <p class="text-gray-950/50">Установить размер шрифта в игре</p>
        <InputUi
          type="number"
          :value="settings.fontSize"
          @input="settings.setFontSize"
        />
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
