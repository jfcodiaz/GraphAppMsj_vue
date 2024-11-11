<template>
  <p :title="formattedFullDate" class="time-ago">{{ formattedDate }}</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { formatDistanceToNow } from 'date-fns'

const props = defineProps({
  dateString: {
    type: String,
    required: true
  }
})

const date = ref(null)
const formattedDate = ref('')
const formattedFullDate = ref('')

const isValidDate = (d) => !isNaN(d.getTime())

const updateFormattedDate = () => {
  if (isValidDate(date.value)) {
    formattedDate.value = formatDistanceToNow(date.value, { addSuffix: true })
    formattedFullDate.value = formatFullDate(date.value)
  } else {
    formattedDate.value = 'Fecha inválida'
    formattedFullDate.value = 'Fecha inválida'
  }
}

const formatFullDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

onMounted(() => {
  date.value = new Date(props.dateString)
  const interval = setInterval(updateFormattedDate, 60000)
  updateFormattedDate()
  onUnmounted(() => {
    clearInterval(interval)
  })
})

watch(() => props.dateString, (newDateString) => {
  date.value = new Date(newDateString)
  updateFormattedDate()
})
</script>

<style scoped>
  .time-ago {
      font-size: 0.8em;
      color: #666;
      text-align: right;
      margin-top: 0.4em;
  }
</style>
