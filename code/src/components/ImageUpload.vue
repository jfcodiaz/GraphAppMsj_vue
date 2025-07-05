<template>
  <div class="image-upload">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileSelect"
      accept="image/*"
      multiple
      style="display: none"
    />
    <button type="button" @click="openFileDialog" class="upload-button">
      📎 Add Images
    </button>
    <div v-if="selectedImages.length > 0" class="image-preview">
      <div
        v-for="(image, index) in selectedImages"
        :key="index"
        class="image-item"
      >
        <img :src="image.preview" :alt="image.name" class="preview-image" />
        <button @click="removeImage(index)" class="remove-button">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['images-selected']);

const fileInput = ref(null);
const selectedImages = ref([]);

const openFileDialog = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImages.value.push({
          name: file.name,
          preview: e.target.result,
          base64: e.target.result.split(',')[1], // Remove data:image/...;base64, prefix
        });
        emit('images-selected', selectedImages.value);
      };
      reader.readAsDataURL(file);
    }
  });

  // Reset input
  event.target.value = '';
};

const removeImage = (index) => {
  selectedImages.value.splice(index, 1);
  emit('images-selected', selectedImages.value);
};

const clearImages = () => {
  selectedImages.value = [];
  emit('images-selected', selectedImages.value);
};

defineExpose({
  clearImages,
});
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.image-upload {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-button {
  padding: 8px 12px;
  border: 1px solid $color-4;
  background-color: $color-2;
  color: $color-4;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s;

  &:hover {
    background-color: $color-3;
  }
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-item {
  position: relative;
  display: inline-block;
}

.preview-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid $color-4;
}

.remove-button {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: $color-5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: $color-1;
  }
}
</style>
