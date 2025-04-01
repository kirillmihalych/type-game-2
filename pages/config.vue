<template>
  <div class="p-4">
    <div>
      <h1 class="text-2xl text-gray-950 mb-6">Настройки</h1>
      <section>
        <div class="flex items-center gap-2 mb-4">
          <!-- <Icon name="lucide:chevron-right" size="1.5rem" /> -->
          <Icon name="lucide:chevron-down" size="1.5rem" />
          <h2 class="text-lg">Типография</h2>
        </div>
        <form class="grid lg:grid-cols-2 lg:items-center mb-4" @submit.prevent>
          <div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:letter-text" size="1.5rem" />
              <h3>Font size</h3>
            </div>
            <p class="text-gray-950/50">Установить размер шрифта в игре</p>
          </div>
          <InputUi
            type="number"
            :value="settings.fontSize"
            @input="settings.setFontSize"
          />
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
