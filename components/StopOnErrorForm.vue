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
          <button
            class="w-full border-2 rounded-md hover:border-black/75"
            @click="settings.turnOnStopOnError"
            :class="[
              settings.isStopOnError ? 'border-black' : 'border-black/25',
            ]"
          >
            ВКЛ
          </button>
        </li>
        <li class="flex-1">
          <button
            class="w-full border-2 rounded-md hover:border-black/75"
            @click="settings.turnOffStopOnError"
            :class="[
              !settings.isStopOnError ? 'border-black' : 'border-black/25',
            ]"
          >
            ВЫКЛ
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
