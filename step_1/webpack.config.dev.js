
// 打包后创建 html 文件 并自动配置引入
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // 插件
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
}
