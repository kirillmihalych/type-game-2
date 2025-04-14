<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:letter-text" size="1.5rem" />
    </template>
    <template v-slot:heading>Шрифт</template>
    <template v-slot:description>Установить шрифт</template>
    <template v-slot:form-input>
      <ul class="flex gap-2">
        <li
          v-for="fontFamily in settings.fontFamilyList"
          :key="fontFamily"
          class="flex-1 border-2 rounded-md hover:bg-slate-100"
          :class="[
            settings.fontFamily === 'PT Mono'
              ? 'font-mono'
              : settings.fontFamily === 'PT Serif'
              ? 'font-serif'
              : 'font-sans',
            fontFamily === settings.fontFamily
              ? 'border-black'
              : 'border-black/25',
          ]"
        >
          <button @click="settings.fontFamily = fontFamily" class="w-full">
            {{ fontFamily }}
          </button>
        </li>
      </ul>
    </template>
  </ConfigForm>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
