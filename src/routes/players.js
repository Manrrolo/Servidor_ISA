const Router = require('koa-router');

const router = new Router();

router.get('players.show', '/profile', async (ctx) => {
  try {
    const token = ctx.request.header;
    const player = await ctx.orm.Player.findByPk(
      token.id,
      {
        include: [
          { model: ctx.orm.Play },
          { model: ctx.orm.Match },
        ],
      },
    );
    ctx.body = player;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;
