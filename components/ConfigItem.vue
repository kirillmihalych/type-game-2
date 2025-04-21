<template>
  <section>
    <h2 class="hover:text-black transition-colors text-lg font-bold">
      <button @click="toggle" class="flex items-center gap-2 mb-4">
        <Icon
          name="lucide:chevron-right"
          size="1.5rem"
          class="transition-transform"
          :class="[showSection ? 'rotate-90' : 'rotate-0']"
        />
        <slot name="header" />
      </button>
    </h2>
    <div v-show="showSection">
      <slot name="main" />
    </div>
  </section>
</template>

<script setup lang="ts">
const showSection = ref(true);

function toggle() {
  showSection.value = !showSection.value;
}
</script>
