<template>
  <footer>
      <p> {{ currentYear }} GraphApp Message</p>
      <a 
        href="https://github.com/jfcodiaz/GraphAppMsj_vue" 
        target="_blank"
      >
        JFcoDíaz
      </a>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
<style scoped lang="scss">
  @use "@/styles/_variables.scss" as vars;
  
  footer {
    background-color: vars.$bg-primary;
    padding: 25px 20px 35px 20px;
    text-align: center;
    line-height: 1.5;
  }
  a {
    color: vars.$text-primary;
    font-weight: bold;
    text-decoration: none;
  }
</style>