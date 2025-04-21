<template>
  <div class="grid grid-rows-[1rem_auto] gap-1">
    <p v-if="!inputValue" class="text-red-500 text-xs">{{ errorMsg }}</p>
    <p v-else class="text-red-500 text-xs"></p>
    <input
      :type="props.type"
      :value="inputValue"
      @input="inputHandler(($event.target as HTMLInputElement).value)"
      class="w-full py-2 px-4 rounded-md bg-zinc-200 dark:text-black"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string | number;
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
