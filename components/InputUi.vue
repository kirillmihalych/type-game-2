<template>
  <div class="grid grid-rows-[1rem_auto] gap-1">
    <p class="text-red-500 text-xs">{{ errorMsg }}</p>
    <input
      :type="props.type"
      :value="props.value"
      @input="inputHandler(($event.target as HTMLInputElement).value)"
      class="w-full p-2 shadow-sm border-2 border-gray-950/50 outline-none focus:border-gray-950 hover:border-gray-950 rounded-md transition-colors duration-300"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string;
  type: string;
}>();

const emits = defineEmits<{
  input: [value: string];
}>();

const errorMsg = ref('');

function inputHandler(value: string) {
  if (!value) {
    errorMsg.value = 'Поле ввода пустое';
  } else {
    errorMsg.value = '';
  }

  emits('input', value);
}
</script>
