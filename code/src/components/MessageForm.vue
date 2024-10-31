<template>
    <div class="input-area">  
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
        <br>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  name: 'MessageForm',
  setup() {
    const store = useStore();
    const newMessage = ref('');
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
<style scoped lang="scss">
    .input-area {
      margin-top: 2em;
      display: flex;
    }

    input {
        flex: 1;
        padding: 10px;
        border: 1px solid $color-4;
        border-radius: 5px;
        font-size: 1.5em;
        color: $color-1;
        background-color: $color-2;
        width: 100%;
    }

    button {
        padding: 10px 20px;
        margin-left: 10px;
        border: none;
        background-color: $color-5;
        color: white;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: $color-1;
    }
    @media (max-width: 700px) {
      .input-area  {
        margin-top: 0;
        display: flex;
        padding: 1em;
    }
  }
</style>