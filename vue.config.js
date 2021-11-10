const timestamp = new Date().getTime()

module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    liveReload: false
  },

  lintOnSave: false,

  chainWebpack: config => {
    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: 'css/[name]' + timestamp + '.css',
        chunkFilename: 'css/[name]' + timestamp + '.css'
      }])
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/[name]' + timestamp + '.js',
      chunkFilename: 'js/[name]' + timestamp + '.js'
    }
  }
}
