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
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="paceType in settings.paceTypes"
          :key="paceType"
          class="flex-1"
        >
          <ButtonUi
            @click="settings.setTheCaretPace(paceType)"
            :item-key="paceType"
            :active-key="settings.theCaretPace"
          >
            {{ paceType }}
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
