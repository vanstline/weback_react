# webpack 学习笔记（1）

本笔记主旨记录在学习 webpack 中，搭建一个 react 项目的从前的到后的一系列内容

## package.json

项目的起始点， 

当我们接手一个新的项目的时候，package.json 应该是我们阅读的第一个文件。

  ```json
"script": {
  "dev": "webpack --config webpack.config.dev.js"
}
  ```

script 中记录了我们所需要用的一系列命令， 其中 `dev` 是算是最常用的命令
当执行 `npm run dev / yarn dev` 时, 会运行字符串中指向的文件 `webpack.config.dev.js`

```json
"dev": "webpack"
// 当你的 webpack 文件名为 `webpack.config.js` 的时候 你可以这么简写
// 不过建议对开发配置和生产配置进行区分
```

## webpack 

```js

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
```

module.exports  因为 webpack 是基于 node 的 所以这里使用的 node 的语法

## entry 入口

entry 作为 webpack 中的入口文件， 所有的文件将在这里进行汇总后打包

## output 出口

出口文件 

- path:  

  打包后的路径，将文件打包在根路径下的 一个名为 dist 的文件中

  这里接受的一个绝对路径， 通过 node 中的 require 引入 path 

- filename:

  打包后的文件名

--

执行  yarn dev 

我们可以在 dist 文件夹中手动创建一个 index.html 的文件并引入 main.js 文件， 就可以进行在浏览器中进行预览了

--

## plugin 插件

> plugin 接受的是一个数组， 这意味着我们可以在项目中使用多个插件

**html-webpack-plugin**

上一步中 webpack 只是入口文件 app.js 打包在为一个叫做 main.js 的文件并放置在 根目录下的一个 dist 的文件夹中， 后续还需要手动创建 html 引入对应的 js 文件 这无疑显得很蠢， 也不方便， 现在通过 插件来解决这一问题

```js
// 打包后创建 html 文件 并自动引入js 
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  // 插件
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
}
```

这里首先先要下载 `html-webpack-plugin`

` npm i-D html-webpack-plugin ` 或者 `yarn add -D html-webpack-plugin` 

对 htmlWebpackPlugin 进行实例后里面接受两个参数

- filename

  生成的 html 文件名

- template

  模版， 当你不想使用 webpack 自动帮你创建的 html 文件（非常简陋）或者你希望对生成的 html 有更多自定义的设置 ， 你将需要使用到模版， 上面代码中会参照 src 文件下的 index.html 打包后在 dist 文件夹生成一份 index.html 文件 ， 并自动引入 打包后的 js



