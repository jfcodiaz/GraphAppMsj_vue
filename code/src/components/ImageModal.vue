<template>
  <div v-if="isVisible" class="image-modal" @click="closeModal">
    <div class="modal-backdrop"></div>
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">×</button>
      <img :src="imageSrc" :alt="altText" class="modal-image" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: 'Enlarged image',
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// Handle ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && props.isVisible) {
    closeModal();
  }
});
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -10px;
  background-color: $color-5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  &:hover {
    background-color: $color-1;
  }
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

@media (max-width: 700px) {
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .close-button {
    top: -30px;
    right: 0;
  }
}
</style>
