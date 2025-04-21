<template>
  <div>
    <form
      class="grid lg:grid-cols-2 lg:items-center lg:gap-4 mb-4"
      @submit.prevent
    >
      <div>
        <div class="flex items-center gap-2">
          <slot name="header-icon" />
          <h3>
            <slot name="heading" />
          </h3>
        </div>
        <p class="text-gray-950/50 dark:text-white/50">
          <slot name="description" />
        </p>
      </div>
      <div>
        <slot name="form-input" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts"></script>
