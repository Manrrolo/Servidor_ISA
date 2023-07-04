const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const session = require('koa-session');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

// Atach Sequelize ORM to the context of the App
app.context.orm = orm;

app.use(cors());

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

app.keys = [`${process.env.APP_KEY}`];

const CONFIG = {
  httpOnly: false,
  maxAge: 14 * 24 * 60 * 60 * 1000,
};

app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

app.use(router.routes());

module.exports = app;
