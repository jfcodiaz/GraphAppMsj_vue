<template>
  <div class="main-container">
    <PageHeader/>
    <div class="web-container">
      <slot></slot>
    </div>
    <FooterPage/>
  </div>
</template>

<script setup>
import FooterPage from '@/components/FooterPage.vue'
import PageHeader from '@/components/PageHeader.vue'

</script>

<style lang="scss">
  input[type="submit"] {
    background-color: $bg-secondary;
    border-color: $bg-primary;
    color: $text-primary;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
  }
  input[type="text"] {
    background-color: $bg-quaternary;
    border-style: solid;
    border-width: 2px;
    border-color: $bg-primary;
    color: $text-secondary;
  }
</style>

<style lang="scss" ecoped>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: $bg-primary;
    background: linear-gradient(12deg, $bg-quaternary, 30%, $bg-primary);
    height: 100vh;
    color: $text-primary;
    font-family: sans-serif;
    font-size: 15px;
  }

  .main-container {
    box-sizing: border-box;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0px;
    background-color: $color-1;
    box-shadow: #000000b5 0px 0 19px 3px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 70%;
  }

  .web-container {
    flex: 1;
    padding: 20px;
    display: flex;
  }

  @media (max-width: 700px) {
    .main-container {
        width: 100%;
    }
    .web-container {
      padding: 0px;
      box-shadow: none;
    }
  }
</style>
