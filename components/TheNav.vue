<template>
  <nav
    class="flex justify-between items-center pl-2 pr-2 pt-4 pb-4 border-b-[1px] border-gray-400/15"
  >
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
      <button class="flex items-center">
        <Icon name="heroicons:moon" size="1.5rem" />
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
// [x] Лучше захардкодить.
</script>
