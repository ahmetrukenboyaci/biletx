<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const message = computed(() => store.getters['payment/message'])

const goToEvents = () => {
  store.dispatch('payment/resetPaymentState')
  router.push('/events')
}

onMounted(() => {
  const isSuccess = store.getters['payment/isSuccess']
  if (!isSuccess) {
    router.push('/events')
  }
})
</script>

<template>
  <div class="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarılı!</h1>
      
      <p class="text-gray-600 mb-8">
        {{ message || 'Biletiniz başarıyla oluşturuldu.' }}
      </p>

      <p class="text-sm text-gray-500 mb-8">
        Bilet bilgileri e-posta adresinize gönderilecektir.
      </p>

      <button
        @click="goToEvents"
        class="bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        Etkinliklere Dön
      </button>
    </div>
  </div>
</template>
