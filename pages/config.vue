<template>
  <div class="p-4">
    <h2>Настройки</h2>
    <section>
      <h3>Типография</h3>
      <div>
        <p>Установить размер шрифта в игре</p>
        <input
          v-model="settings.fontSize"
          type="number"
          class="w-full border-2 border-orange-400"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
