<template>
  <div class="messages" ref="messageList" @scroll="handleScroll">
    <div v-for="message in messages" :key="message.id" class="message">
      <MenssageBox
        :message="message"
        :me="me"
      />
    </div>      
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { computed, watch, ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import MenssageBox from './MessageBox.vue';
import { useSubscription } from '@vue/apollo-composable';

const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      text
      userId
      createdAt
    }
  }
`;

export default {
  components: {
    MenssageBox,
  },
  setup() {
    const store = useStore();
    const messages = computed(() => store.getters.messages);
    const me = computed(() => store.getters.getUser);
    const fetchMessages = () => store.dispatch('fetchMessages');

    // Referencia al contenedor de mensajes
    const messageList = ref(null);

    // Función para manejar el scroll inverso (cargar mensajes antiguos)
    const handleScroll = () => {
      if (messageList.value && messageList.value.scrollTop === 0) {
        loadPreviousMessages();
      }
    };

    // Simulación de carga de mensajes antiguos
    const loadPreviousMessages = () => {
      const oldMessages = [
        { id: 'old1', text: 'Mensaje anterior 1', userId: '123', createdAt: new Date().toISOString() },
        { id: 'old2', text: 'Mensaje anterior 2', userId: '123', createdAt: new Date().toISOString() }
      ];
      // Agregar mensajes antiguos al principio de la lista
      messages.value.unshift(...oldMessages);
    };

    // Function to determine if the scroll is near the end (90%)
    const shouldScroll = () => {
      const container = messageList.value;
      if (!container) return false;
      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollThreshold = container.scrollHeight * 0.9;
      return scrollPosition >= scrollThreshold;
    };

    const { result } = useSubscription(MESSAGE_CREATED_SUBSCRIPTION);

    let first = true;
    watch(messages, ()=> {
      nextTick(() => 
      {
        if (!first) {
          return;
        }
        first = false;
        const lastMessage = messageList.value?.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }) })
    watch(result, (newResult) => {
      if (newResult && newResult.messageCreated) {
        messages.value.push(newResult.messageCreated);
        nextTick(() => {
          if (shouldScroll()) {
            const lastMessage = messageList.value?.lastElementChild;
            if (lastMessage) {
              lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
    });

    fetchMessages();
    return {
      me,
      messages,
      messageList, // Asignar el contenedor de mensajes
      handleScroll, // Asignar el método para manejar el scroll
    };
  },
};
</script>

<style scoped>
.messages {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
