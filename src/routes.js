const Router = require('koa-router');
const matches = require('./routes/matches');
const players = require('./routes/players');
const plays = require('./routes/plays');
const tiles = require('./routes/tiles');
const auth = require('./routes/auth');
const middlewares = require('./middlewares/jwt');
const admin = require('./middlewares/admin');
const adminrouter = require('./routes/admin');

const router = new Router();

router.use('/auth', auth.routes());
router.use('/matches', middlewares, matches.routes());

router.use('/players', middlewares, players.routes());
router.use('/plays', middlewares, plays.routes());
router.use('/tiles', middlewares, tiles.routes());
router.use('/admin', admin, adminrouter.routes());

module.exports = router;
