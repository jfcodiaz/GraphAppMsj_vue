<template>
  <div class="chat-room">
    <RoomHeader/>
    <MessagesList/>
    <MessageForm/>        
  </div>
</template>
<script>
import MessageForm from './MessageForm.vue';
import MessagesList from './MessagesList.vue';
import RoomHeader from './RoomHeader.vue';

export default {
  components: {
    RoomHeader,
    MessagesList,
    MessageForm
  }
}
</script>
<style scoped lang="scss">

@use "@/styles/_variables.scss" as vars;

.chat-room {
    background-color: rgba($color: vars.$bg-secondary, $alpha: 0.6);
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #cccccc15;
    border-radius: 10px;
}

.messages {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
}

.message {
    margin-bottom: 10px;
}


</style>