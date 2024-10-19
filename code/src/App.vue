<template>
  <DefaultLayout>
    <router-view></router-view>
  </DefaultLayout>
</template>

<script>

import DefaultLayout from './layout/DefaultLayout.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout
  }
}
</script>

<style lang="scss">

@use "@/styles/_variables.scss" as vars;

#app {
  font-family: vars.$font-family-primary;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: vars.$text-primary;
  margin-top: 60px;
}
</style>
