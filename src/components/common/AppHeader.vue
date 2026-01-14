<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/events')
}
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center cursor-pointer" @click="goHome">
          <div class="flex-shrink-0">
            <span class="text-2xl font-bold text-primary-600">BiletX</span>
          </div>
        </div>
        <nav class="flex space-x-4">
          <router-link 
            to="/events" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
          >
            Etkinlikler
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>
