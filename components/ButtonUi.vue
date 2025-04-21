<template>
  <button
    class="w-full p-2 rounded-md text-white bg-zinc-400 dark:bg-zinc-800 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white dark:ring-offset-black hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:hover:text-black active:bg-zinc-600 dark:active:bg-zinc-400"
    :class="[isActive ? 'bg-zinc-800 dark:!bg-zinc-200 dark:!text-black' : '']"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  itemKey?: string;
  activeKey?: string;
  isOptionTurnedOn?: boolean;
}>();

const isActive = computed(() => {
  return props.itemKey && props.activeKey
    ? props.itemKey === props.activeKey
    : props.isOptionTurnedOn;
});
</script>
