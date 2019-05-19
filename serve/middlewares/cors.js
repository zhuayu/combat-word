const cors = {
  allowAll: async function(ctx, next){
    // ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
    ctx.set("Access-Control-Allow-Headers", 'X-Custom-Header,accept, content-type');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    await next()
  }
}

module.exports = cors;