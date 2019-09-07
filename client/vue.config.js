module.exports = {
  lintOnSave: process.env.VUE_APP_ON_SAVE === 'true' ? true : false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_TARGET,
        ws: process.env.VUE_APP_API_WS === 'true' ? true : false,
        changeOrigin: process.env.VUE_APP_API_CHANGE_ORIGIN === 'true' ? true : false
      }
    }
  }
}