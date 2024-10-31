<template>
  <menu>
    <button @click="close">
      x
    </button>
  </menu>
</template>
<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const close = () => {
        store.dispatch('clean');
        router.push('/');
      } 
      return {
        close
      }
    }
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