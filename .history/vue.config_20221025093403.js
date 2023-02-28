const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/': {
        target: 'https://sgisapi.kostat.go.kr/OpenAPI3/',
        pathRewrite:{'^/':''},
        changeOrigin:true,
        secure:false
      }
    }
  }
})
