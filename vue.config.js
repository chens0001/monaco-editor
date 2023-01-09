const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin'); 

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages:["javascript","css","html","json"],
        features:["coreCommands","find"]
      }
    ])
  }
})