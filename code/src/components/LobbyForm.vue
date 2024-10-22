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

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ErrorAlert from './ErrorAlert.vue';

export default {
  components: {
    ErrorAlert,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const errorMessage = ref('');

    onMounted(() => {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        username.value = savedUsername;
      }
    });

    const validateUsername = (event) => {
      const regex = /^[a-zA-Z0-9]*$/; // Only letters and numbers
      if (!regex.test(event.target.value)) {
        username.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
      }
    };

    const login = () => {
      errorMessage.value = '';
      if (username.value.trim() === '') {
        errorMessage.value = 'Please enter a username.';
      } else if (/^\d/.test(username.value)) {
        errorMessage.value = 'The username cannot start with a number.';
      } else {
        localStorage.setItem('username', username.value);
        store.dispatch('join', { username: username.value });
        router.push('/room');
      }
    };

    return {
      username,
      errorMessage,
      login,
      validateUsername,
    };
  },
};
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
