<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:letter-text" size="1.5rem" />
    </template>
    <template v-slot:heading>Размер шрифта</template>
    <template v-slot:description>Установить размер шрифта в игре</template>
    <template v-slot:form-input>
      <InputUi
        type="number"
        :value="settings.fontSize"
        @input="settings.setFontSize"
      />
    </template>
  </ConfigForm>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
