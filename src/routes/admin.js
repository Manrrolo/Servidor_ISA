const Router = require('koa-router');

const router = new Router();

router.delete('matches.delete', '/delete_match/:id_match', async (ctx) => {
  try {
    let found = false;
    const token = ctx.request.header;
    const id = await parseInt(ctx.params.id_match, 10);
    console.log(ctx.params.id_match);
    token.matches.forEach((match) => {
      if (match.id === id) {
        found = true;
      }
    });
    if (found) {
      await ctx.orm.Match.destroy({
        where: { id: `${ctx.params.id_match}` },
      });
      ctx.response.status = 202;
    } else {
      ctx.throw('No tienes permiso para eliminar esta partida', 401);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.get('players.list', '/panel', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll();
    const matches = await ctx.orm.Match.findAll();
    ctx.body = {
      players,
      matches,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.delete('players.delete', '/delete_player/:id_player', async (ctx) => {
  try {
    let found = false;
    let name = '';
    const id = await parseInt(ctx.params.id_player, 10);
    console.log(ctx.params.id_player);
    ctx.header.player.forEach((jugador) => {
      console.log(jugador.id);
      if (jugador.id === id) {
        found = true;
      }
    });
    if (found) {
      const player = await ctx.orm.Player.findByPk(id);
      name = player.nickname;
      await ctx.orm.Player.destroy({
        where: { id: `${id}` },
      });
      ctx.response.status = 202;
      ctx.body = {
        data: `Usuario ${name} eliminado con exito`,
      };
    } else {
      ctx.throw('No tienes permiso para eliminar esta usuario', 401);
    }
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;
