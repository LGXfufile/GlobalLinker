<template>
  <div class="count-number">{{ displayValue }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  startVal: {
    type: Number,
    default: 0
  },
  endVal: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 2000
  }
})

const displayValue = ref(props.startVal)

onMounted(() => {
  const step = (props.endVal - props.startVal) / (props.duration / 16)
  let current = props.startVal
  const timer = setInterval(() => {
    current += step
    if (current >= props.endVal) {
      displayValue.value = props.endVal
      clearInterval(timer)
    } else {
      displayValue.value = Math.floor(current)
    }
  }, 16)
})
</script>

<style scoped>
.count-number {
  font-size: 36px;
  font-weight: bold;
  color: #2a5298;
  text-align: center;
}
</style> 