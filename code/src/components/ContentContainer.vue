<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<script>
export default {
  setup() {
    return {};
  }
}
</script>
<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
