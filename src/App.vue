<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>
