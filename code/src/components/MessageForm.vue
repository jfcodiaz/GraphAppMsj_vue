<template>
    <div class="input-area">  
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
        <br>
    </div>
    <pre style="text-align: left;">{{ messages }}</pre>
</template>
<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  name: 'MessageForm',
  setup() {
    const store = useStore();
    const newMessage = ref('Hola Mundo!');
    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        store.dispatch('sendMessage', newMessage.value);
        newMessage.value = '';
      }
    };
    const messages = computed(() => store.getters.messages);
    return {
        messages,
        newMessage,
        sendMessage
    };
  }
}

</script>
<style scoped>
    .input-area {
        display: flex;
    }

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        margin-left: 10px;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>