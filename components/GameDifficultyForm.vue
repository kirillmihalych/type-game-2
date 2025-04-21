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
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="difficulty in settings.gameDifficulties"
          :key="difficulty"
          class="flex-1"
        >
          <ButtonUi
            @click="settings.setGameDifficulty(difficulty)"
            :item-key="difficulty"
            :active-key="settings.selectedGameDifficulty"
          >
            {{ difficulty }}
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
