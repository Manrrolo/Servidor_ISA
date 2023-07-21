const Router = require('koa-router');
const matches = require('./routes/matches');
const players = require('./routes/players');
const auth = require('./routes/auth');
const middlewares = require('./middlewares/jwt');
const files = require('./routes/files');
const admin = require('./middlewares/admin');
const adminrouter = require('./routes/admin');

const router = new Router();

router.use('/auth', auth.routes());
router.use('/matches', middlewares, matches.routes());
router.use('/files', middlewares, files.routes());
router.use('/players', middlewares, players.routes());
router.use('/admin', admin, adminrouter.routes());

module.exports = router;
