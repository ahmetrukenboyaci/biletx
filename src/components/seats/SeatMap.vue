<script setup>
import { ref, computed } from 'vue'
import SeatItem from './SeatItem.vue'

const props = defineProps({
  seats: {
    type: Array,
    required: true
  },
  selectedSeatIds: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['select-seat'])

const zoom = ref(1)
const minZoom = 0.5
const maxZoom = 2

const groupedSeats = computed(() => {
  const groups = {}
  props.seats.forEach(seat => {
    if (!groups[seat.row]) {
      groups[seat.row] = []
    }
    groups[seat.row].push(seat)
  })
  Object.keys(groups).forEach(row => {
    groups[row].sort((a, b) => a.number - b.number)
  })
  return groups
})

const sortedRows = computed(() => {
  return Object.keys(groupedSeats.value).sort()
})

const zoomIn = () => {
  if (zoom.value < maxZoom) {
    zoom.value = Math.min(zoom.value + 0.2, maxZoom)
  }
}

const zoomOut = () => {
  if (zoom.value > minZoom) {
    zoom.value = Math.max(zoom.value - 0.2, minZoom)
  }
}

const resetZoom = () => {
  zoom.value = 1
}

const isSeatSelected = (seatId) => {
  return props.selectedSeatIds.includes(seatId)
}

const handleSeatSelect = (seat) => {
  emit('select-seat', seat)
}
</script>

<template>
  <div class="relative">
    <div class="absolute right-4 top-4 z-10 flex flex-col gap-2">
      <button 
        @click="resetZoom"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <button 
        @click="zoomIn"
        :disabled="zoom >= maxZoom"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <button 
        @click="zoomOut"
        :disabled="zoom <= minZoom"
        class="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
    </div>

    <div class="overflow-auto bg-gray-100 rounded-lg p-4 min-h-[400px]">
      <div 
        class="transition-transform duration-200 origin-center"
        :style="{ transform: `scale(${zoom})` }"
      >
        <div class="bg-gray-300 text-center py-2 px-8 rounded-t-lg mx-auto w-64 mb-8">
          <span class="text-sm font-medium text-gray-600">SAHNE</span>
        </div>

        <div class="flex flex-col gap-2 items-center">
          <div 
            v-for="row in sortedRows" 
            :key="row"
            class="flex items-center gap-1"
          >
            <span class="w-6 text-xs text-gray-500 text-right mr-2">{{ row }}</span>
            <div class="flex gap-1">
              <SeatItem
                v-for="seat in groupedSeats[row]"
                :key="seat.id"
                :seat="seat"
                :is-selected="isSeatSelected(seat.id)"
                @select="handleSeatSelect"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
