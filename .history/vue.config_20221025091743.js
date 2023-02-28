const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/map': {
        target: 'http://',
        pathRewrite:{'^/':''},
        changeOrigin:true,
        secure:false
      }
    }
  }
})
