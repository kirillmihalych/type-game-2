<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:text-cursor" size="1.5rem" />
    </template>
    <template v-slot:heading>Плавность курсора</template>
    <template v-slot:description
      >Плавность переноса курсора от символа к символу</template
    >
    <template v-slot:form-input>
      <ul class="flex gap-2">
        <li
          class="flex-1 border-2 rounded-md hover:bg-slate-100"
          :class="[
            !settings.isTheCaretSmooth ? 'border-black' : 'border-black/25',
          ]"
        >
          <button @click="settings.turnOffTheCaretSmooth" class="w-full">
            выкл
          </button>
        </li>
        <li
          v-for="paceType in settings.paceTypes"
          :key="paceType"
          class="flex-1 border-2 rounded-md hover:bg-slate-100"
          :class="[
            paceType === settings.theCaretPace && settings.isTheCaretSmooth
              ? 'border-black'
              : 'border-black/25',
          ]"
        >
          <button @click="settings.setTheCaretPace(paceType)" class="w-full">
            {{ paceType }}
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
