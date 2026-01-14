<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import EventCard from '@/components/events/EventCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useStore()

const events = computed(() => store.getters['events/allEvents'])
const loading = computed(() => store.getters['events/isLoading'])
const error = computed(() => store.getters['events/error'])

onMounted(() => {
  store.dispatch('events/fetchEvents')
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Etkinlikler</h1>
      <p class="mt-2 text-gray-600">En güncel etkinlikleri keşfedin</p>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else-if="events.length === 0" class="text-center py-12 text-gray-500">
      Henüz etkinlik bulunmuyor.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <EventCard 
        v-for="event in events" 
        :key="event.id" 
        :event="event" 
      />
    </div>
  </div>
</template>
