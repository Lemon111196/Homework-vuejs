const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules", "./src/assets"],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@validations": path.resolve(
          __dirname,
          "src/service/validation/validation.js"
        ),
      },
    },
  },
})
