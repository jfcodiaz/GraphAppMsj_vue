<template>
  <menu>
    <button @click="close" class="btn-exit">
      x
    </button>
  </menu>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const close = () => {
  store.dispatch('clean')
  router.push('/')
}
</script>

<style lang="scss" scoped>
  menu {
    justify-content: end;
    display: flex;
    margin-bottom: 0.5em;
  }
  button {
    background-color: $color-3;
    color: #d57d7d;
    border: none;
    border-radius: 0.3em;
    padding: 0.5em 1em;
    font-size: 1em;
    cursor: pointer;
  }
</style>
