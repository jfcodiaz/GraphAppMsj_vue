<template>
  <div class="image-gallery" v-if="props.images && props.images.length > 0">
    <div class="gallery-container">
      <div
        v-for="(image, index) in props.images"
        :key="index"
        class="gallery-item"
        @click="enlargeImage(image)"
      >
        <img
          :src="getImageSrc(image)"
          :alt="`Image ${index + 1}`"
          class="gallery-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['image-click']);

const getImageSrc = (image) => {
  // Handle both base64 strings and full data URLs
  if (typeof image === 'string') {
    return image.startsWith('data:')
      ? image
      : `data:image/jpeg;base64,${image}`;
  }
  return image.preview || image.base64 || image;
};

const enlargeImage = (image) => {
  emit('image-click', getImageSrc(image));
};
</script>

<style scoped lang="scss">
@import '@/styles/_variables.scss';

.image-gallery {
  margin-top: 8px;
  margin-bottom: 5px;
}

.gallery-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 100%;
}

.gallery-item {
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
}

.gallery-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    border-color: $color-5;
  }
}

/* Responsive adjustments */
@media (max-width: 700px) {
  .gallery-image {
    width: 60px;
    height: 60px;
  }
}
</style>
