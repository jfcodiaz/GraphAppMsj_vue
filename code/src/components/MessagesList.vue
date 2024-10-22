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
      user {
        id
        username
      }
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
    const messageList = ref(null);
    const handleScroll = () => {
      if (messageList.value && messageList.value.scrollTop === 0) {
        loadPreviousMessages();
      }
    };
    const loadPreviousMessages = () => {
      fetchMessages();

    };
    const shouldScroll = () => {
      const container = messageList.value;
      if (!container) return false;
      const scrollPosition = container.scrollTop + container.clientHeight;
      const scrollThreshold = container.scrollHeight * 0.2;
      return scrollPosition >= scrollThreshold;
    };

    const { result } = useSubscription(MESSAGE_CREATED_SUBSCRIPTION);

    let first = true;
    let firstMessage;
    watch(messages, ()=> {
      nextTick(() => 
      {
        if (first) {
          first = false;
          const lastMessage = messageList.value?.lastElementChild;
          firstMessage = messageList.value?.firstElementChild;
          if (lastMessage) {
            lastMessage.scrollIntoView();
          }
          return;
        }
        firstMessage.scrollIntoView();
        firstMessage = messageList.value?.firstElementChild;
      })
    })
  
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
      messageList,
      handleScroll,
    };
  },
};
</script>

<style scoped>
.messages {
  max-height: 100%;
  overflow-y: auto;
  border: 1px solid #dddddd14;
  padding: 10px;
  
}
.message {
  display: grid;
}
</style>
