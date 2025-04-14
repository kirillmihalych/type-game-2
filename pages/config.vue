<template>
  <div class="p-4">
    <div>
      <h1 class="text-2xl text-gray-950 mb-6">Настройки</h1>
      <ConfigItem>
        <template v-slot:header> Типография </template>
        <template v-slot:main>
          <FontSizeForm />
          <FontFamilyForm />
          <MaxLineWidthForm />
        </template>
      </ConfigItem>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
