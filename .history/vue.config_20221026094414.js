const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'https://sgisapi.kostat.go.kr/OpenAPI3',
        pathRewrite:{'^/':''},
        changeOrigin:true,
        secure:false
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('vue', '@vue/compat')
​
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  }
})
