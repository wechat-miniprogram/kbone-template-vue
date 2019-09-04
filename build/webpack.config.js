const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isOptimize = true // 是否压缩业务代码

module.exports = {
    mode: 'production',
    entry: {
        // js 入口
        home: path.resolve(__dirname, '../src/home/main.js'),
        detail: path.resolve(__dirname, '../src/detail/main.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist/web'),
        publicPath: './',
        filename: '[name].js'
    },
    target: 'web',
    optimization: {
        runtimeChunk: false,
        splitChunks: { // 代码分割配置，不建议修改
            chunks: 'all',
            minSize: 1000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 100,
            maxInitialRequests: 100,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },

        minimizer: isOptimize ? [
            // 压缩CSS
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(css|wxss)$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                    }],
                },
                canPrint: false
            }),
            // 压缩 js
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
            })
        ] : [],
    },
    module: {
        rules: [
            // html
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            // css
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => {
                                return [
                                    require('autoprefixer'),
                                ]
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
            },
            // vue
            {
                test: /\.vue$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    },
                ]
            },
            // js
            {
                test: /\.js$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        }
                    }
                ],
                exclude: /node_modules/
            },
            // res
            {
                test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]_[hash:hex:6].[ext]',
                        publicPath: 'https://test.miniprogram.com/res', // 对于资源文件直接使用线上的 cdn 地址
                        emitFile: false,
                    }
                }],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: path.join(__dirname, '../src/index.html')
        }),
    ],
}
