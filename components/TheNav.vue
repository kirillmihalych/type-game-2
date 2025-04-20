<template>
  <nav class="flex justify-between items-center py-4 lg:py-6">
    <ul class="flex gap-2">
      <li>
        <NuxtLink to="/" class="flex items-center gap-1">
          <Icon name="heroicons:play" />
          <span> Игра </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/config" class="flex items-center gap-1">
          <Icon name="heroicons:cog-6-tooth" />
          <span> Настройки </span>
        </NuxtLink>
      </li>
    </ul>
    <div class="flex items-center gap-2">
      <button class="flex items-center" @click="setDarkMode">
        <ClientOnly fallback-tag="span">
          <Icon v-if="isLightMode" name="lucide:moon" size="1.5rem" />
          <Icon v-if="isDarkMode" name="lucide:sun-medium" size="1.5rem" />
        </ClientOnly>
      </button>
      <NuxtLink
        to="https://github.com/kirillmihalych"
        class="flex items-center"
      >
        <Icon name="uil:github" size="1.75rem" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => {
  return colorMode.preference === 'dark';
});
const isLightMode = computed(() => {
  return colorMode.preference === 'light';
});

function setDarkMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>
