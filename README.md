# vue-kbone

使用 react 多端开发(小程序和Web)，基于 [kbone](https://github.com/wechat-miniprogram/kbone) 的 element 和 render。

## 特性

* 一键接入，立即使用
* 支持更完整的 vue 语法及特性
* webpack、es2018+、babel7+、jsx、hot reload、cli、vue-router、vuex，你想要的都有

## 开发

```
npm run start

# 或者 

npm run dev
```

Web 端：直接浏览器访问 localhost:8081/ 即可看到效果。
小程序端：使用开发者工具打开 dist/mp 目录即可。

## 构建

```
npm run build
```

构建完成会生成 dist 目录：

```
dist
  |-- web Web 端目标代码目录
  |-- mp 小程序端目标代码目录
```
