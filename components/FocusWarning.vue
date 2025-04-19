<template>
  <div
    v-show="!props.isInputFocused"
    class="flex items-center justify-center gap-1 absolute size-full p-4 font-bold text-base z-10"
  >
    <Icon name="lucide:mouse-pointer-click" size="1rem" class="scale-110" />
    <p>Вернуть фокус</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isInputFocused: boolean;
}>();
</script>
