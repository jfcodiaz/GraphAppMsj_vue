<template>
  <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message">
        <MenssageBox
          :message="message"
          :me="me"
        />
      </div>      
    </div>
</template>
<script>


import { computed } from 'vue';
import { useStore } from 'vuex';
import MenssageBox from './MessageBox.vue';

export default {
  setup() {
    const store = useStore();
    const messages = computed(() => store.getters.messages);
    const me = computed(() => store.getters.getUser);
    const fetchMessages = () => store.dispatch('fetchMessages');
    fetchMessages();
    return  {
      me,
      messages,
    }
  },
  components: {
    MenssageBox,
  },
}
</script>