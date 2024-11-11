const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `,
      },
    },
  },
  devServer: {
    allowedHosts: [
      'host.docker.internal',
      'localhost',
      '127.0.0.1',
      '.example.com',
      '192.168.0.101',
    ],
  },
});
