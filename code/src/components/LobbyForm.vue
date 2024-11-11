<template>
  <form @submit.prevent="login">
    <p>Please enter your username:</p>
    <p>
      <input
        v-model="username"
        @input="validateUsername"
        type="text"
        placeholder="Enter your username"
      />
    </p>
    <ErrorAlert :error="errorMessage"/>
    <p><input type="submit" value="Join" /></p>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ErrorAlert from './ErrorAlert.vue'

const store = useStore()
const router = useRouter()
const username = ref('')
const errorMessage = ref('')

onMounted(() => {
  const savedUsername = localStorage.getItem('username')
  if (savedUsername) {
    username.value = savedUsername
  }
})

const validateUsername = (event) => {
  if (event.inputType === 'insertLineBreak') {
    return event
  }
  const regex = /^[a-zA-Z0-9]*$/ // Solo letras y números
  if (!regex.test(event.target.value)) {
    username.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '')
  }
}

const login = async () => {
  errorMessage.value = ''

  // Validar nombre de usuario
  if (username.value.trim() === '') {
    errorMessage.value = 'Please enter a username.'
    return
  } else if (/^\d/.test(username.value)) {
    errorMessage.value = 'The username cannot start with a number.'
    return
  }

  try {
    await store.dispatch('join', { username: username.value })
    localStorage.setItem('username', username.value)
    router.push('/room')
  } catch (error) {
    errorMessage.value = 'An error occurred while joining the room.'
  }
}
</script>

<style scoped>
input[type="text"],
input[type="submit"] {
  padding: 10px;
  box-sizing: border-box;
  margin: 10px 0;
  border-radius: 5px;
  max-width: 400px;
  font-size: 1.5em;
  width: 100%;
}

@media (max-width: 600px) {
  input[type="text"],
  input[type="submit"] {
    padding: 5px;
    font-size: 1em;
  }
}
</style>
