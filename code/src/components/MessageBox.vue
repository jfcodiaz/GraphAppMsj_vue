<template>
  <div class="message-box" :class="messageClass">
    <div class="autor" v-if="messageClass === 'received'">
      <b>{{ message.user.username }}</b> :
    </div>
    <div v-if="message.text" class="message-text">
      {{ message.text }}
    </div>
    <ImageGallery
      v-if="message.images && message.images.length > 0"
      :images="message.images"
      @image-click="handleImageClick"
    />
    <TimeAgo :date-string="message.createdAt" />
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import TimeAgo from './TimeAgo.vue';
import ImageGallery from './ImageGallery.vue';

const emit = defineEmits(['image-click']);

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  me: {
    type: Object,
    required: true,
  },
});

const isSent = () => {
  if (!props.me) return;
  return props.message.userId === props.me.id ? 'sent' : 'received';
};

const messageClass = computed(isSent);

const handleImageClick = (imageSrc) => {
  emit('image-click', imageSrc);
};
</script>

<style scoped lang="scss">
.message {
  margin-bottom: 10px;
}

.autor {
  font-size: 0.8em;
  color: $color-3;
}

.message-box {
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  position: relative;
  word-wrap: break-word;

  color: $color-4;
  font-family: sans-serif;
}

.message-text {
  margin-bottom: 5px;
}

.message-box.received {
  color: $color-5;
}

.sent {
  color: $color-4;
  background-color: #dcf8c6;
  justify-self: end;
}

.received {
  background-color: $color-2;
}

.sent::after,
.received::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.sent::after {
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #dcf8c6;
  top: 10px;
  right: -9px;
}

.received::after {
  border-width: 10px 10px 10px 0;
  border-color: transparent $color-2 transparent transparent;
  top: 10px;
  left: -9px;
}
</style>
