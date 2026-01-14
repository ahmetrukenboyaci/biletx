<script setup>
import { computed } from 'vue'

const props = defineProps({
  seat: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const seatClass = computed(() => {
  if (props.seat.isBooked) {
    return 'bg-gray-200 cursor-not-allowed'
  }
  if (props.isSelected) {
    return 'bg-green-500 cursor-pointer hover:bg-green-600'
  }
  return 'bg-primary-400 cursor-pointer hover:bg-primary-500'
})

const handleClick = () => {
  if (!props.seat.isBooked) {
    emit('select', props.seat)
  }
}
</script>

<template>
  <button
    @click="handleClick"
    :disabled="seat.isBooked"
    :title="`${seat.row}-${seat.number}`"
    :class="[
      seatClass,
      'w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-colors duration-200 flex-shrink-0'
    ]"
  ></button>
</template>
