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
          <button
            class="w-full border-2 rounded-md hover:border-black/75"
            @click="settings.turnOnFreedomMode"
            :class="[
              settings.isFreedomMode ? 'border-black' : 'border-black/25',
            ]"
          >
            ВКЛ
          </button>
        </li>
        <li class="flex-1">
          <button
            class="w-full border-2 rounded-md hover:border-black/75"
            @click="settings.turnOffFreedomMode"
            :class="[
              !settings.isFreedomMode ? 'border-black' : 'border-black/25',
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
