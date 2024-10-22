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
