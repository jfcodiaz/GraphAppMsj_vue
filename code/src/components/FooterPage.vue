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
    background-color: vars.$color-3;
    padding: 25px 20px 35px 20px;
    text-align: center;
    line-height: 1.5;
  }
  a {
    color: vars.$text-primary;
    font-weight: bold;
    text-decoration: none;
  }

  @media (max-width: 700px) {
    footer {
      padding: 0.5em 2em;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      ;
    }  
  }
</style>