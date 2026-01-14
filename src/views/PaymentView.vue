<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import PaymentForm from '@/components/payment/PaymentForm.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const selectedSeats = computed(() => store.getters['seats/selectedSeats'])
const selectedCategory = computed(() => store.getters['seats/selectedCategory'])
const totalPrice = computed(() => store.getters['seats/totalPrice'])
const currentEvent = computed(() => store.getters['events/currentEvent'])
const loading = computed(() => store.getters['payment/isLoading'])
const paymentError = computed(() => store.getters['payment/error'])

const handlePayment = async (formData) => {
  const paymentData = {
    eventId: currentEvent.value?.id,
    eventCategoryId: selectedCategory.value?.id,
    seats: selectedSeats.value.map(s => s.id),
    ...formData
  }

  try {
    await store.dispatch('payment/processPayment', paymentData)
    store.dispatch('seats/clearSelection')
    router.push('/payment-success')
  } catch (error) {
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  if (selectedSeats.value.length === 0) {
    router.push('/events')
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <h1 class="text-2xl font-bold text-gray-900">Ödeme</h1>
      <div class="w-20"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Ödeme Bilgileri</h2>
          
          <div v-if="paymentError" class="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {{ paymentError }}
          </div>

          <div v-if="loading" class="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>

          <PaymentForm v-else @submit="handlePayment" />
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h3>
          
          <div v-if="currentEvent" class="mb-4 pb-4 border-b border-gray-200">
            <p class="font-medium text-gray-900">{{ currentEvent.title }}</p>
            <p class="text-sm text-gray-500">{{ currentEvent.venue?.name }}</p>
          </div>

          <div v-if="selectedCategory" class="mb-4">
            <p class="text-sm text-gray-500">Kategori</p>
            <p class="font-medium text-gray-900">{{ selectedCategory.name }}</p>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-500">Seçilen Koltuklar</p>
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="seat in selectedSeats" 
                :key="seat.id"
                class="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
              >
                {{ seat.row }}-{{ seat.number }}
              </span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Bilet Fiyatı</span>
              <span class="font-medium">{{ selectedCategory?.price || 0 }} TL</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600">Adet</span>
              <span class="font-medium">{{ selectedSeats.length }}</span>
            </div>
            <div class="flex justify-between items-center mt-4 text-lg font-bold">
              <span>Toplam</span>
              <span class="text-primary-600">{{ totalPrice }} TL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
