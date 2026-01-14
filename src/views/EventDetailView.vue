<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const selectedCategoryId = ref(null)

const event = computed(() => store.getters['events/currentEvent'])
const loading = computed(() => store.getters['events/isLoading'])
const error = computed(() => store.getters['events/error'])

const selectedCategory = computed(() => {
  if (!event.value?.categories || !selectedCategoryId.value) return null
  return event.value.categories.find(c => c.id === selectedCategoryId.value)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goToSeatPlan = () => {
  if (!selectedCategoryId.value) return
  store.dispatch('seats/setSelectedCategory', selectedCategory.value)
  router.push(`/seat-plan/${route.params.id}/${selectedCategoryId.value}`)
}

onMounted(() => {
  store.dispatch('events/fetchEventById', route.params.id)
})

watch(() => event.value, (newEvent) => {
  if (newEvent?.categories?.length > 0) {
    selectedCategoryId.value = newEvent.categories[0].id
  }
}, { immediate: true })
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else-if="event" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            :src="event.image_url" 
            :alt="event.title"
            class="w-full h-64 sm:h-96 object-cover"
          />
          <div class="p-6">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {{ event.title }}
            </h1>
            <p class="text-gray-600 leading-relaxed">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <div class="space-y-4 mb-6">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="text-sm text-gray-500">Tarih</p>
                <p class="font-medium text-gray-900">{{ formatDate(event.event_date) }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm text-gray-500">Saat</p>
                <p class="font-medium text-gray-900">{{ formatTime(event.event_date) }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="text-sm text-gray-500">Mekan</p>
                <p class="font-medium text-gray-900">{{ event.venue?.name }}</p>
                <p class="text-sm text-gray-500">{{ event.venue?.address }}</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Bilet Kategorisi
            </label>
            <select 
              v-model="selectedCategoryId"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option 
                v-for="category in event.categories" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }} - {{ category.price }} TL
              </option>
            </select>

            <button 
              @click="goToSeatPlan"
              :disabled="!selectedCategoryId"
              class="w-full mt-4 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Koltuk Seç
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
