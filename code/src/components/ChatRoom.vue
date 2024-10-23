<template>
  <div class="chat-room">
    <MenuBar/>
    <MessagesList/>
    <MessageForm/>        
  </div>
</template>
<script>
import MessageForm from './MessageForm.vue';
import MessagesList from './MessagesList.vue';
import MenuBar from './MenuBar.vue'
export default {
  components: {
    MessagesList,
    MessageForm,
    MenuBar
  }
}
</script>
<style scoped lang="scss">

@use "@/styles/_variables.scss" as vars;
  .chat-room {
      background-color: rgba($color: vars.$bg-secondary, $alpha: 0.6);
      padding: 50px;
      border-radius: 10px;
      max-height: 65vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
  }

  @media (max-width: 800px) {
    .chat-room {
      padding: 10px;
    }
  }
  @media (max-width: 700px) {
    .chat-room {
      padding: 0px;
      max-height: 86vh;
    }
  }
</style>