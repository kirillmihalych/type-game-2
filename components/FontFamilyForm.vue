<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:letter-text" size="1.5rem" />
    </template>
    <template v-slot:heading>Шрифт</template>
    <template v-slot:description>Установить шрифт</template>
    <template v-slot:form-input>
      <ul class="flex flex-col md:flex-row flex-wrap gap-2">
        <li
          v-for="fontFamily in settings.fontFamilyList"
          :key="fontFamily"
          class="flex-1"
        >
          <ButtonUi
            :item-key="fontFamily"
            :active-key="settings.fontFamily"
            @click="settings.fontFamily = fontFamily"
          >
            {{ fontFamily }}
          </ButtonUi>
        </li>
      </ul>
    </template>
  </ConfigForm>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings';

const settings = useSettingsStore();
</script>
