<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:feather" size="1.5rem" />
    </template>
    <template v-slot:heading>Свободный мод</template>
    <template v-slot:description
      >Можно удалить любое слово, даже если оно было введено верно</template
    >
    <template v-slot:form-input>
      <ul class="flex gap-2 transition-colors">
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOnFreedomMode"
            :is-option-turned-on="settings.isFreedomMode"
          >
            вкл
          </ButtonUi>
        </li>
        <li class="flex-1">
          <ButtonUi
            @click="settings.turnOffFreedomMode"
            :is-option-turned-on="!settings.isFreedomMode"
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
