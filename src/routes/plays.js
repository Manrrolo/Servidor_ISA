const Router = require('koa-router');

const router = new Router();

router.get('plays.show', '/', async (ctx) => {
  try {
    const play = await ctx.orm.Play.findAll({
      include: [
        { model: ctx.orm.Match },
        { model: ctx.orm.Player },
        { model: ctx.orm.Tile, as: 'coordenada_i' },
        { model: ctx.orm.Tile, as: 'coordenada_f' },
      ],
    });
    ctx.body = play;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
router.post('plays.create', '/', async (ctx) => {
  try {
    const token = ctx.request.header;
    const matches = await ctx.orm.Match.count();
    if (matches <= ctx.request.body.match_id) {
      ctx.throw('El match no existe en la base de datos', 400);
    }
    if (token.admin) {
      ctx.throw('El admin no esta autorizado para mover las tropas', 403);
    }
    const match = await ctx.orm.Match.findByPk(ctx.request.body.match_id);
    const lista = 'A1 A2 A3 A4 B1 B2 B3 B4 C1 C2 C3 C4 D1 D2 D3 D4 E1 E2 E3 E4';
    // Verificando que el player pertenezca al match
    if (![match.player_1, match.player_2].includes(token.id)) {
      ctx.throw('No tienes permiso para realizar esta jugada', 403);
    }
    if (match.current !== (token.id)) {
      ctx.throw('No es tu turno', 403);
    }
    if (!lista.includes(ctx.request.body.casillaOrigen)) {
      ctx.throw('Debes seleccionar una casilla de origen', 400);
    }
    if (!lista.includes(ctx.request.body.casillaDestino)) {
      ctx.throw('Debes seleccionar una casilla de destino', 400);
    }
    const tile1 = await ctx.orm.Tile.findAll({
      where: {
        coordenada: ctx.request.body.casillaOrigen,
        match_id: ctx.request.body.match_id,
      },
    });
    const tile2 = await ctx.orm.Tile.findAll({
      where: {
        coordenada: ctx.request.body.casillaDestino,
        match_id: ctx.request.body.match_id,
      },
    });
    const casilla1id = tile1[0].dataValues.id;
    const casilla2id = tile2[0].dataValues.id;
    const casillaInicial = await ctx.orm.Tile.findByPk(casilla1id);
    const casillaFinal = await ctx.orm.Tile.findByPk(casilla2id);
    if (casillaInicial.player !== token.id) {
      ctx.throw('La casilla seleccionada no te pertenece', 400);
    }
    if (!tile1[0].dataValues.lista.includes(tile2[0].dataValues.coordenada)) {
      ctx.throw('La casilla final no es colindante a la casilla inical', 400);
    }
    if (casillaInicial.tropas === 0) {
      ctx.throw('La casilla seleccionada no tiene tropas', 400);
    }
    if (ctx.request.body.numeroTropas > casillaInicial.tropas) {
      ctx.throw('El número de tropas excede el número de tropas de la casilla', 400);
    }

    console.log(tile1);
    tile1[0].save();
    console.log(tile2);
    tile2[0].save();
    const plays = await ctx.orm.Play.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    await ctx.orm.Play.create({
      id: plays[0].dataValues.id + 1,
      coordenada_inicial: tile1[0].dataValues.id,
      coordenada_final: tile2[0].dataValues.id,
      player: token.id,
      match_id: ctx.request.body.match_id,
      estado: 'Realizado',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (casillaFinal.player !== token.id) {
      if (ctx.request.body.numeroTropas * 11 > casillaFinal.tropas * 12 + casillaFinal.defensas) {
        casillaInicial.tropas -= await ctx.request.body.numeroTropas;
        casillaFinal.tropas = await ctx.request.body.numeroTropas;
        casillaFinal.player = await token.id;
        casillaInicial.save();
        casillaFinal.save();
        match.turno += 1;
        match.current = token.id === match.player_1 ? match.player_2 : match.player_1;
        match.save();
        ctx.body = {
          mensaje: 'Has ganado la batalla',
        };
      } else {
        casillaInicial.tropas -= ctx.request.body.numeroTropas;
        if (casillaFinal.tropas > 2) {
          casillaFinal.tropas -= ctx.request.body.numeroTropas / 2;
        }
        casillaInicial.save();
        casillaFinal.save();
        match.turno += 1;
        match.current = token.id === match.player_1 ? match.player_2 : match.player_1;
        match.save();
        ctx.body = {
          mensaje: 'Has perdido la batalla',
        };
      }
    } else {
      casillaInicial.tropas -= ctx.request.body.numeroTropas;
      casillaFinal.tropas += ctx.request.body.numeroTropas;
      casillaInicial.save();
      casillaFinal.save();
      match.turno += 1;
      match.current = token.id === match.player_1 ? match.player_2 : match.player_1;
      match.save();
      ctx.body = {
        mensaje: 'Has movido tus tropas',
      };
    }
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
