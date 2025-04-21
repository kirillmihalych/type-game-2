<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:letter-text" size="1.5rem" />
    </template>
    <template v-slot:heading>Длина строки</template>
    <template v-slot:description
      >Устанавливает максимальный размер строки. Максимальный размер равный 0,
      будет занимать всё доступное пространство.
    </template>
    <template v-slot:form-input>
      <InputUi
        :type="'number'"
        :value="settings.maxLineLength"
        @input="settings.setMaxLineLength"
      />
    </template>
  </ConfigForm>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
