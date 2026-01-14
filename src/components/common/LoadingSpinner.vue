<script setup>
defineProps({
  size: {
    type: String,
    default: 'md'
  }
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div 
      :class="[sizeClasses[size], 'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600']"
    ></div>
  </div>
</template>
