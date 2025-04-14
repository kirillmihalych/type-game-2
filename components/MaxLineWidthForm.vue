<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:letter-text" size="1.5rem" />
    </template>
    <template v-slot:heading>Длина строки</template>
    <template v-slot:description
      >Устанавливает максимальный размер строки
    </template>
    <template v-slot:form-input>
      <input
        type="number"
        v-model="settings.maxLineLength"
        min="30"
        max="60"
        class="w-full p-2 shadow-sm border-2 border-gray-950/50 outline-none focus:border-gray-950 hover:border-gray-950 rounded-md transition-colors duration-300"
      />
    </template>
  </ConfigForm>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
