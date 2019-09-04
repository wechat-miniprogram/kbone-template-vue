const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')

const webpackConfig = require('./webpack.config')

const app = new Koa()
const port = parseInt(process.env.PORT, 10) || 8081

// 渲染页面
function render(ctx, name) {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream(path.resolve(__dirname, `../dist/web/${name}.html`))
}

// 页面请求
const router = new KoaRouter()
router.get('/(home|index)?', ctx => render(ctx, 'home'))
router.get('/test/(home|index)', ctx => render(ctx, 'home'))
router.get('/test/list/:id', ctx => render(ctx, 'list'))
router.get('/test/detail/:id', ctx => render(ctx, 'detail'))

app.use(router.routes())
app.use(KoaStatic(path.resolve(__dirname, '../dist/web')))

// 404
app.use(async ctx => {
    const msg = `[404]: '${ctx.request.url}'`
    console.log(msg)
    ctx.throw(404, msg)
})

app.on('error', err => {
    console.error(err)
})

app.listen(port)
webpack(webpackConfig).watch({
    ignored: /node_modules/,
}, (err, stats) => {
    if (!err) {
        console.log(stats.toString({
            assets: true,
            cached: false,
            colors: true,
            children: false,
            errors: true,
            warnings: true,
            version: true,
            modules: false,
            publicPath: true,
        }))
    } else {
        console.log(err)
    }
})
