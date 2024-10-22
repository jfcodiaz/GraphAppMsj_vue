<template>
  <div class="main-container">
    <PageHeader/>
    <div class="web-container">
      <slot></slot>
    </div>
    <FooterPage/>
</div>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue';
import PageHeader from '@/components/PageHeader.vue';

export default {
  components: {
    PageHeader,
    FooterPage
  }
};
</script>

<style lang="scss">
  @use "@/styles/_variables.scss" as vars;
  input[type="submit"] {
    background-color: vars.$bg-secondary;
    border-color: vars.$bg-primary;
    color: vars.$text-primary;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
  }
  input[type="text"] {
    background-color: vars.$bg-quaternary;
    border-style: solid;
    border-width: 2px;
    border-color: vars.$bg-primary;
    color: vars.$text-secondary;
  }
</style>

<style lang="scss" ecoped>
  @use "@/styles/_variables.scss" as vars;

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: vars.$bg-primary;
    background: linear-gradient(0deg, vars.$bg-quaternary, 30%, vars.$bg-primary);
    height: 100vh;
    color: vars.$text-primary;
    font-family: sans-serif;
    font-size: 15px;
  }

  .main-container {
    box-sizing: border-box;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 0px;
    background-color: vars.$bg-secondary;
    box-shadow: #000000b5 0px 0 19px 3px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 70%;
  }

  @media (max-width: 700px) {
    .main-container {
        width: 100%;
    }
  }

  .web-container {
    flex: 1;
    padding: 20px;
  }
</style>
