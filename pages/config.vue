<template>
  <div class="min-h-dvh h-full">
    <div>
      <h1 class="text-2xl mb-6">Настройки</h1>
      <ConfigItem>
        <template v-slot:header> Типография </template>
        <template v-slot:main>
          <FontSizeForm />
          <FontFamilyForm />
          <MaxLineWidthForm />
        </template>
      </ConfigItem>
      <ConfigItem>
        <template v-slot:header> Геймплей </template>
        <template v-slot:main>
          <GameDifficultyForm />
          <FreedomModeForm />
          <StopOnErrorForm />
        </template>
      </ConfigItem>
      <ConfigItem>
        <template v-slot:header> Анимации </template>
        <template v-slot:main>
          <TheCaretForm />
          <SmoothScrollForm />
        </template>
      </ConfigItem>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
