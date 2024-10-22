<template>
  <p v-if="error" class="error-message">{{ error }}</p>
</template>
<script>
  export default {
    props: {
      error: {
        type: String,
        required: true,
      },
    },
  };
</script>
<style scoped>
  .error-message {
    background-color: #23283557;
    margin: 10px 0px;
    padding: 20px;
    font-size: 16px;
    color: #d19191c4;
    max-width: 300px;
  }
</style>