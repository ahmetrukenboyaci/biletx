<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  customer_name: '',
  customer_surname: '',
  customer_email: '',
  cc_number: '',
  cc_exp_month: '',
  cc_exp_year: '',
  cc_cvv: ''
})

const errors = reactive({
  customer_name: '',
  customer_surname: '',
  customer_email: '',
  cc_number: '',
  cc_exp_month: '',
  cc_exp_year: '',
  cc_cvv: ''
})

const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D/g, '')
  const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
  return formatted.substring(0, 19)
}

const handleCardInput = (e) => {
  form.cc_number = formatCardNumber(e.target.value)
}

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validate = () => {
  let isValid = true

  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  if (!form.customer_name.trim()) {
    errors.customer_name = 'Ad alanı zorunludur'
    isValid = false
  }

  if (!form.customer_surname.trim()) {
    errors.customer_surname = 'Soyad alanı zorunludur'
    isValid = false
  }

  if (!form.customer_email.trim()) {
    errors.customer_email = 'E-posta alanı zorunludur'
    isValid = false
  } else if (!validateEmail(form.customer_email)) {
    errors.customer_email = 'Geçerli bir e-posta adresi giriniz'
    isValid = false
  }

  if (!form.cc_number.trim()) {
    errors.cc_number = 'Kart numarası zorunludur'
    isValid = false
  } else if (form.cc_number.replace(/\s/g, '').length !== 16) {
    errors.cc_number = 'Geçerli bir kart numarası giriniz'
    isValid = false
  }

  if (!form.cc_exp_month) {
    errors.cc_exp_month = 'Ay zorunludur'
    isValid = false
  }

  if (!form.cc_exp_year) {
    errors.cc_exp_year = 'Yıl zorunludur'
    isValid = false
  }

  if (!form.cc_cvv) {
    errors.cc_cvv = 'CVV zorunludur'
    isValid = false
  } else if (form.cc_cvv.toString().length < 3) {
    errors.cc_cvv = 'Geçerli bir CVV giriniz'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validate()) {
    emit('submit', {
      customer_name: form.customer_name,
      customer_surname: form.customer_surname,
      customer_email: form.customer_email,
      cc_number: form.cc_number,
      cc_exp_month: parseInt(form.cc_exp_month),
      cc_exp_year: parseInt(form.cc_exp_year),
      cc_cvv: parseInt(form.cc_cvv)
    })
  }
}

const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: String(i + 1).padStart(2, '0')
}))

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => ({
  value: (currentYear + i) % 100,
  label: String(currentYear + i)
}))
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Ad</label>
        <input
          v-model="form.customer_name"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          :class="errors.customer_name ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.customer_name" class="mt-1 text-sm text-red-500">{{ errors.customer_name }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Soyad</label>
        <input
          v-model="form.customer_surname"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          :class="errors.customer_surname ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.customer_surname" class="mt-1 text-sm text-red-500">{{ errors.customer_surname }}</p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
      <input
        v-model="form.customer_email"
        type="email"
        class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        :class="errors.customer_email ? 'border-red-500' : 'border-gray-300'"
      />
      <p v-if="errors.customer_email" class="mt-1 text-sm text-red-500">{{ errors.customer_email }}</p>
    </div>

    <div class="border-t border-gray-200 pt-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Kart Bilgileri</h3>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Kart Numarası</label>
        <input
          :value="form.cc_number"
          @input="handleCardInput"
          type="text"
          maxlength="19"
          placeholder="1234 5678 9012 3456"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          :class="errors.cc_number ? 'border-red-500' : 'border-gray-300'"
        />
        <p v-if="errors.cc_number" class="mt-1 text-sm text-red-500">{{ errors.cc_number }}</p>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ay</label>
          <select
            v-model="form.cc_exp_month"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            :class="errors.cc_exp_month ? 'border-red-500' : 'border-gray-300'"
          >
            <option value="">Ay</option>
            <option v-for="month in months" :key="month.value" :value="month.value">
              {{ month.label }}
            </option>
          </select>
          <p v-if="errors.cc_exp_month" class="mt-1 text-sm text-red-500">{{ errors.cc_exp_month }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Yıl</label>
          <select
            v-model="form.cc_exp_year"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            :class="errors.cc_exp_year ? 'border-red-500' : 'border-gray-300'"
          >
            <option value="">Yıl</option>
            <option v-for="year in years" :key="year.value" :value="year.value">
              {{ year.label }}
            </option>
          </select>
          <p v-if="errors.cc_exp_year" class="mt-1 text-sm text-red-500">{{ errors.cc_exp_year }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            v-model="form.cc_cvv"
            type="text"
            maxlength="4"
            placeholder="123"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            :class="errors.cc_cvv ? 'border-red-500' : 'border-gray-300'"
          />
          <p v-if="errors.cc_cvv" class="mt-1 text-sm text-red-500">{{ errors.cc_cvv }}</p>
        </div>
      </div>
    </div>

    <button 
      type="submit"
      class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
    >
      Bilet Satın Al
    </button>
  </form>
</template>
