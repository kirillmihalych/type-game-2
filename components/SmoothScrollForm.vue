<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:text" size="1.5rem" />
    </template>
    <template v-slot:heading>Плавный перенос рядов</template>
    <template v-slot:description>Ряды тексты буду переноситься плавно</template>
    <template v-slot:form-input>
      <ul class="flex gap-2 transition-colors">
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOnSmoothScroll"
            :is-option-turned-on="settings.isLineScrollSmooth"
          >
            вкл
          </ButtonUi>
        </li>
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOffSmoothScroll"
            :is-option-turned-on="!settings.isLineScrollSmooth"
          >
            выкл
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
