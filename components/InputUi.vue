<template>
  <div class="grid grid-rows-[1rem_auto] gap-1">
    <p v-if="!inputValue" class="text-red-500 text-xs">{{ errorMsg }}</p>
    <p v-else class="text-red-500 text-xs"></p>
    <input
      :type="props.type"
      :value="inputValue"
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

const inputValue = ref(props.value);
const errorMsg = ref('Поле ввода пустое');

function inputHandler(value: string) {
  inputValue.value = value;
  emits('input', value);
}
</script>
