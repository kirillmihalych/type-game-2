<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:hand" size="1.5rem" />
    </template>
    <template v-slot:heading>Остановка при ошибке</template>
    <template v-slot:description
      >Включенная опция не даст продолжить тест пока слово не будет введено
      верно</template
    >
    <template v-slot:form-input>
      <ul class="flex gap-2 transition-colors">
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOnStopOnError"
            :is-option-turned-on="settings.isStopOnError"
          >
            вкл
          </ButtonUi>
        </li>
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOffStopOnError"
            :is-option-turned-on="!settings.isStopOnError"
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
