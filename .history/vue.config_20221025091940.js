const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/map': {
        target: 'https://sgisapi.kostat.go.kr/OpenAPI3/',
        pathRewrite:{'^/':''},
        changeOrigin:true,
        secure:false
      }
    }
  }
})
