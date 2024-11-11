<template>
  <ContentContainer>
    <div class="lobby">
      <h1>Welcome</h1>
      <LobbyForm />
    </div>
  </ContentContainer>
</template>

<script>
import { onMounted } from 'vue'
import ContentContainer from '@/components/ContentContainer.vue'
import LobbyForm from '@/components/LobbyForm.vue'

export default {
  components: {
    ContentContainer,
    LobbyForm
  },
  setup () {
    onMounted(() => {
      document.title = 'GraphApp Messenger :: Lobby Page'
    })
  }
}
</script>

<style scoped lang="scss">

h1 {
    margin: 0.5em 0;
    font-size: 2.5em;
}

.lobby {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f0f038;
  max-width: 800px;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
}

@media (max-width: 600px) {
    .lobby {
        padding: 10px;
        width: 70%;
    }
}
</style>
