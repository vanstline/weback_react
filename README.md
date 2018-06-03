# webpack 学习笔记（2）

package.json

```json
{
  "name": "1",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config webpack.config.dev.js",
    "start": "webpack-dev-server --config webpack.config.dev.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.4.0",
    "react-dom": "^16.4.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.4",
    "babel-preset-react": "^6.24.1",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "3.12.0",
    "webpack-dev-server": "2.8.2"
  }
}
```



## html-webpack-plugin

打包后自动生成 html 文件, 引入相关js 文件

```javascript
const htmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
  new htmlWebpackPlugin({
    filename: 'index.html',  // 生成文件名
    template: 'src/index.html'  // 模版文件, 生成的html 会按照该文件结构复制
  })
]
```

## babel-loder

- babel-loder
-  babel-core
- bable-preset-react

babel-loder 依赖于 babel-core  所以这两个包都需要安装

babel-loader 只是将我们的代码进行编译, 至于是针对与 react, vue 还是 es6, 它并不知情, 需要自行定义

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loder',
        options: {
          presets: ['react'] // 对编译进行预设 
        }
      }]
    }]
  }
}

// 上面预设中 的 react 只是一种简写, 这个包全名是 bable-preset-react
```

## webpack-dev-server

通过 devServer 就可以将我们的项目正式跑在服务器上了

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --config webpack.config.dev.js",
  + "start": "webpack --config webpack.config.dev.js"
  }
```

`start` 这条命令比较特殊 不需要加 run 

```bash
yarn start 
// 就可以运行服务了 默认8080端口
```

> version 3.1.4 之后的版本 这里可能会出现无法启动服务的情况, 请参照 package.json 进行版本回退

打包后的资源将不存放在本地文件夹,而是存放在服务器上

这里还会对文件进行监视修改代码动态刷新页面  (不等同与热替换的局部刷新)

如果想做一些更多的自定义的操作 例如:

```javascript
module.exports = {
  devServer: {
    open: true,  // 启动服务后自动在浏览器中打开页面
    port: 9000  // 修改端口号
  }
}
```

## css-loader

- css-loader
- style-loader

css-loader 是负责处理样式的 但还是需要 style-loader 将打包后的样式 插入html 中

否则样式将不会生效

```javascript
{
  test: /\.css$/,
    use: [ 'style-loader', 'css-loader' ]  // 这里的顺序不能乱, 样式将从数组的后往前执行, 第一部处理完后, 将样式交给 style-loader 插入文件中
}
```



