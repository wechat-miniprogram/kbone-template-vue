const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const autoprefixer = require('autoprefixer')
const {VueLoaderPlugin} = require('vue-loader')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{from: /.*/, to: '/index.html'}],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: process.env.HOST || 'localhost',
    port: +process.env.PORT || 8080,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {warnings: false, errors: true} : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  module: {
    rules: [{
      test: /\.(less|css)$/,
      use: [{
        loader: 'vue-style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer,
          ],
        }
      }, {
        loader: 'less-loader',
      }],
    }],
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
  ],
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = +process.env.PORT || 8080
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
      }))

      resolve(devWebpackConfig)
    }
  })
})
