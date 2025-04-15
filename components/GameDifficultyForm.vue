<template>
  <ConfigForm>
    <template v-slot:header-icon>
      <Icon name="lucide:star" size="1.5rem" />
    </template>
    <template v-slot:heading>Сложность игры</template>
    <template v-slot:description
      >Эксперт заканчивает тест при первой же ошибке. Сложный заканчивается тест
      если нажат пробел при неверном слове. Стандартный тест даёт классический
      опыт печатания.</template
    >
    <template v-slot:form-input>
      <ul class="flex gap-2">
        <li
          v-for="difficulty in settings.gameDifficulties"
          :key="difficulty"
          class="flex-1 border-2 rounded-md hover:bg-slate-100"
          :class="[
            difficulty === settings.selectedGameDifficulty
              ? 'border-black'
              : 'border-black/25',
          ]"
        >
          <button
            @click="settings.setGameDifficulty(difficulty)"
            class="w-full"
          >
            {{ difficulty }}
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
