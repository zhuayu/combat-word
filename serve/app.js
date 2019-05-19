const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const app = new Koa();
const response = require('./middlewares/response');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

app
  .use(cors.allowAll)
  .use(bodyParser())
  .use(response)
  .use(auth.decode)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
