<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import SeatMap from '@/components/seats/SeatMap.vue'
import SeatLegend from '@/components/seats/SeatLegend.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const activeTab = ref('manual')
const autoSelectCount = ref(1)

const seats = computed(() => store.getters['seats/allSeats'])
const selectedSeats = computed(() => store.getters['seats/selectedSeats'])
const selectedSeatIds = computed(() => store.getters['seats/selectedSeatIds'])
const selectedCategory = computed(() => store.getters['seats/selectedCategory'])
const totalPrice = computed(() => store.getters['seats/totalPrice'])
const loading = computed(() => store.getters['seats/isLoading'])
const error = computed(() => store.getters['seats/error'])

const availableSeats = computed(() => {
  return seats.value.filter(s => !s.isBooked)
})

const handleSeatSelect = (seat) => {
  store.dispatch('seats/toggleSeatSelection', seat)
}

const autoSelect = () => {
  store.dispatch('seats/clearSelection')
  const available = availableSeats.value.slice(0, autoSelectCount.value)
  available.forEach(seat => {
    store.dispatch('seats/toggleSeatSelection', seat)
  })
}

const goToPayment = () => {
  if (selectedSeats.value.length === 0) return
  router.push('/payment')
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  const { eventId, categoryId } = route.params
  store.dispatch('seats/fetchSeatPlan', { eventId, categoryId })
})

onUnmounted(() => {
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-center justify-between mb-6">
      <button 
        @click="goBack"
        class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Geri
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Koltuk Seçimi</h1>
      <div class="w-20"></div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-3">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="flex border-b border-gray-200">
            <button
              @click="activeTab = 'auto'"
              :class="[
                'flex-1 py-3 px-4 text-sm font-medium transition-colors',
                activeTab === 'auto' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]"
            >
              Otomatik Seçim
            </button>
            <button
              @click="activeTab = 'manual'"
              :class="[
                'flex-1 py-3 px-4 text-sm font-medium transition-colors',
                activeTab === 'manual' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              ]"
            >
              Kendiniz Seçin
            </button>
          </div>

          <div v-if="activeTab === 'auto'" class="p-6">
            <div class="flex items-center gap-4 mb-6">
              <label class="text-sm text-gray-700">Koltuk Sayısı:</label>
              <input
                v-model.number="autoSelectCount"
                type="number"
                min="1"
                :max="availableSeats.length"
                class="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                @click="autoSelect"
                class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Otomatik Seç
              </button>
            </div>
            <SeatMap 
              :seats="seats" 
              :selected-seat-ids="selectedSeatIds"
              @select-seat="handleSeatSelect"
            />
          </div>

          <div v-else class="p-6">
            <SeatMap 
              :seats="seats" 
              :selected-seat-ids="selectedSeatIds"
              @select-seat="handleSeatSelect"
            />
          </div>

          <div class="p-4 bg-gray-50 border-t border-gray-200">
            <SeatLegend />
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Seçim Özeti</h3>
          
          <div v-if="selectedCategory" class="mb-4">
            <p class="text-sm text-gray-500">Kategori</p>
            <p class="font-medium text-gray-900">{{ selectedCategory.name }}</p>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-500">Seçilen Koltuklar</p>
            <div v-if="selectedSeats.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="seat in selectedSeats" 
                :key="seat.id"
                class="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
              >
                {{ seat.row }}-{{ seat.number }}
              </span>
            </div>
            <p v-else class="text-gray-400 text-sm mt-1">Henüz koltuk seçilmedi</p>
          </div>

          <div class="border-t border-gray-200 pt-4 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Bilet Fiyatı</span>
              <span class="font-medium">{{ selectedCategory?.price || 0 }} TL</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600">Adet</span>
              <span class="font-medium">{{ selectedSeats.length }}</span>
            </div>
            <div class="flex justify-between items-center mt-2 text-lg font-bold">
              <span>Toplam</span>
              <span class="text-primary-600">{{ totalPrice }} TL</span>
            </div>
          </div>

          <button 
            @click="goToPayment"
            :disabled="selectedSeats.length === 0"
            class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
