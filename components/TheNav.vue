<template>
  <nav class="flex justify-between items-center py-4 lg:py-6">
    <ul class="flex gap-2 text-zinc-400 transition-colors">
      <li>
        <NuxtLink
          to="/"
          class="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-2 focus:outline-offset-2 focus:text-zinc-800 active:text-zinc-800dark:active:text-zinc-200 dark:focus:text-zinc-200"
        >
          <Icon name="lucide:play" size="1.5rem" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/config"
          class="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-2 focus:outline-offset-2 focus:text-zinc-800 active:text-zinc-800 dark:active:text-zinc-200 dark:focus:text-zinc-200"
        >
          <Icon name="lucide:settings" size="1.5rem" />
        </NuxtLink>
      </li>
    </ul>
    <div class="flex items-center gap-2 text-zinc-400">
      <button
        class="flex items-center hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-2 focus:outline-offset-2 focus:text-zinc-800 active:text-zinc-800 dark:active:text-zinc-200 dark:focus:text-zinc-200"
        @click="setDarkMode"
      >
        <Icon :name="iconName" size="1.5rem" />
      </button>
      <NuxtLink
        to="https://github.com/kirillmihalych/type-game-nuxt"
        class="flex items-center hover:text-zinc-800 dark:hover:text-zinc-200 focus:outline-2 focus:outline-offset-2 focus:text-zinc-800 active:text-zinc-800 dark:active:text-zinc-200 dark:focus:text-zinc-200"
      >
        <Icon name="lucide:github" size="1.5rem" />
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

const iconName = computed(() => {
  return isDarkMode.value ? 'lucide:sun-medium' : 'lucide:moon';
});

function setDarkMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>
