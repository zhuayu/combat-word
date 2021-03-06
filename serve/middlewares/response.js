const debug = require('debug')('koa-app')

/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
  try {
    ctx.state.code = 0
    ctx.state.data = {}
    await next()

    console.log(ctx.url)
    ctx.body = ctx.body ? ctx.body : {
      code: ctx.state.code,
      data: ctx.state.data
    }
  } catch (e) {
    // catch 住全局的错误信息
    debug('Catch Error: %o', e)
    // 设置状态码为 200 - 服务端错误
    ctx.status = 200

    // 输出详细的错误信息
    ctx.body = {
      code: -1,
      error: e && e.message ? e.message : e.toString()
    }
  }
}