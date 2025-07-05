<template>
  <div class="input-area">
    <div class="input-row">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        class="message-input"
      />
      <button @click="sendMessage" :disabled="!canSendMessage">Send</button>
    </div>
    <ImageUpload ref="imageUpload" @images-selected="handleImagesSelected" />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import ImageUpload from './ImageUpload.vue';

const store = useStore();
const newMessage = ref('');
const selectedImages = ref([]);
const imageUpload = ref(null);

const canSendMessage = computed(() => {
  return newMessage.value.trim() !== '' || selectedImages.value.length > 0;
});

const handleImagesSelected = (images) => {
  selectedImages.value = images;
};

const sendMessage = () => {
  if (canSendMessage.value) {
    const messageData = {
      text: newMessage.value.trim(),
      images: selectedImages.value.map((img) => img.base64),
    };

    store.dispatch('sendMessage', messageData);
    newMessage.value = '';
    selectedImages.value = [];
    imageUpload.value?.clearImages();
  }
};
</script>

<style scoped lang="scss">
.input-area {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-row {
  display: flex;
  gap: 10px;
}

.message-input {
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

button:hover:not(:disabled) {
  background-color: $color-1;
}

@media (max-width: 700px) {
  .input-area {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 10px;
  }

  .input-row {
    display: flex;
    gap: 10px;
  }
}
</style>
