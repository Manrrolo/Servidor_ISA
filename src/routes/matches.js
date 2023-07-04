const Router = require('koa-router');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const router = new Router();

router.get('matches.show', '/:id', async (ctx) => {
  try {
    const token = ctx.request.header;
    const match = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Player, as: 'player1' },
        { model: ctx.orm.Player, as: 'player2' },
        { model: ctx.orm.Tile, where: { tropas: { [Op.gt]: 0 } } },
      ],
    });
    const match2 = await ctx.orm.Match.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Player, as: 'player1' },
        { model: ctx.orm.Player, as: 'player2' },
        { model: ctx.orm.Tile, where: { tropas: 0 } },
      ],
    });
    if (!match) {
      ctx.throw(404);
    }
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    if (!(token.admin)) {
      const requestPlayer = await ctx.orm.Player.findByPk(token.id);
      if (![player1.id, player2.id].includes(requestPlayer.id)) {
        ctx.throw('No tienes permiso para acceder al tablero', 403);
      }
    }
    ctx.body = {
      casilla: match.Tiles,
      casilla_2: match2.Tiles,
      current: match.current,
      turno: match.turno,
      matches: match,
      player1,
      player2,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.get('matches.list', '/', async (ctx) => {
  try {
    const token = ctx.request.header;
    const matches = await ctx.orm.Match.findAll();
    const sala1 = await ctx.orm.Sala.findAll({
      where: {
        estado: 'En curso',
        player1: { [Op.ne]: token.id },
      },
    });
    const sala2 = await ctx.orm.Sala.findAll({
      where: {
        player1: token.id,
        estado: 'En Preparación',
      },
    });

    ctx.body = {
      matches,
      sala1,
      sala2,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('matches.edit', '/compra', async (ctx) => {
  try {
    const token = ctx.request.header;
    if (token.admin) {
      ctx.throw('El admin no esta autorizado para comprar en la tienda', 403);
    }
    const match = await ctx.orm.Match.findByPk(ctx.request.body.match_id);
    const casillajugadorcasa = await ctx.orm.Tile.findAll({
      where: {
        player: token.id,
        match_id: ctx.request.body.match_id,
        tipo: 'casa',
      },
    });
    const casillajugadorcastillo = await ctx.orm.Tile.findAll({
      where: {
        player: token.id,
        match_id: ctx.request.body.match_id,
        tipo: 'castillo',
      },
    });
    const casillarandom = casillajugadorcasa[Math.floor(Math.random() * casillajugadorcasa.length)];
    const item = await ctx.orm.ShopProduct.findByPk(ctx.request.body.item_id);
    if (![match.player_1, match.player_2].includes(token.id)) {
      ctx.throw('No tienes permiso para realizar esta jugada', 403);
    }
    if (match.current !== (token.id)) {
      ctx.throw('No es tu turno', 403);
    }
    if (match.player_1 === token.id) {
      if (match.mineral_1 < item.costoMineral) {
        ctx.throw('No tienes suficientes unidades de mineral para hacer la compra', 403);
      }
      if (match.arcilla_1 < item.costoArcilla) {
        ctx.throw('No tienes suficientes unidades de madera para hacer la compra', 403);
      }
      if (match.trigo_1 < item.costoTrigo) {
        ctx.throw('No tienes suficientes unidades de trigo para hacer la compra', 403);
      }
      if (match.madera_1 < item.costoMadera) {
        ctx.throw('No tienes suficientes unidades de madera para hacer la compra', 403);
      }
      if (item.name === 'Mejora de casa') {
        const casillaelegida = await ctx.orm.Tile.findByPk(casillarandom.id);
        casillaelegida.nivel += 1;
        casillaelegida.defensas += 10;
        casillaelegida.cantidad_recursos += 1;
        match.arcilla_1 -= item.costoArcilla;
        match.mineral_1 -= item.costoMineral;
        match.madera_1 -= item.costoMadera;
        match.trigo_1 -= item.costoTrigo;
        casillaelegida.save();
      }
      if (item.name === 'Mejora de castillo') {
        const castilloelegido = await ctx.orm.Tile.findByPk(casillajugadorcastillo[0].id);
        castilloelegido.nivel += 1;
        castilloelegido.defensas += 10;
        match.arcilla_1 -= item.costoArcilla;
        match.mineral_1 -= item.costoMineral;
        match.madera_1 -= item.costoMadera;
        match.trigo_1 -= item.costoTrigo;
        castilloelegido.save();
      }
      if (item.name === 'Caballero') {
        const castilloelegido = await ctx.orm.Tile.findByPk(casillajugadorcastillo[0].id);
        castilloelegido.tropas += 1;
        match.arcilla_1 -= item.costoArcilla;
        match.mineral_1 -= item.costoMineral;
        match.madera_1 -= item.costoMadera;
        match.trigo_1 -= item.costoTrigo;
        castilloelegido.save();
      }
    }
    if (match.player_2 === token.id) {
      if (match.mineral_2 < item.costoMineral) {
        ctx.throw('No tienes suficientes unidades de mineral para hacer la compra', 403);
      }
      if (match.arcilla_2 < item.costoArcilla) {
        ctx.throw('No tienes suficientes unidades de madera para hacer la compra', 403);
      }
      if (match.trigo_2 < item.costoTrigo) {
        ctx.throw('No tienes suficientes unidades de trigo para hacer la compra', 403);
      }
      if (match.madera_2 < item.costoMadera) {
        ctx.throw('No tienes suficientes unidades de madera para hacer la compra', 403);
      }
      if (item.name === 'Mejora de casa') {
        const casillaelegida = await ctx.orm.Tile.findByPk(casillarandom.id);
        casillaelegida.nivel += 1;
        casillaelegida.cantidad_recursos += 1;
        casillaelegida.defensas += 10;
        match.arcilla_2 -= item.costoArcilla;
        match.mineral_2 -= item.costoMineral;
        match.madera_2 -= item.costoMadera;
        match.trigo_2 -= item.costoTrigo;
        casillaelegida.save();
      }
      if (item.name === 'Mejora de castillo') {
        const castilloelegido = await ctx.orm.Tile.findByPk(casillajugadorcastillo[0].id);
        castilloelegido.nivel += 1;
        castilloelegido.defensas += 10;
        match.arcilla_2 -= item.costoArcilla;
        match.mineral_2 -= item.costoMineral;
        match.madera_2 -= item.costoMadera;
        match.trigo_2 -= item.costoTrigo;
        castilloelegido.save();
      }
      if (item.name === 'Caballero') {
        const castilloelegido = await ctx.orm.Tile.findByPk(casillajugadorcastillo[0].id);
        castilloelegido.tropas += 1;
        match.arcilla_2 -= item.costoArcilla;
        match.mineral_2 -= item.costoMineral;
        match.madera_2 -= item.costoMadera;
        match.trigo_2 -= item.costoTrigo;
        castilloelegido.save();
      }
    }
    match.save();
    ctx.body = {
      data: 'Compra exitosa!',
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('salas.create', '/sala', async (ctx) => {
  try {
    let password = await ctx.request.body.password;
    const nombre = await ctx.request.body.nombre;
    const tipo = await ctx.request.body.tipo;
    const token = ctx.request.header;
    if (token.admin) {
      ctx.throw('El admin no esta autorizado para crear partidas', 403);
    }
    if (nombre.indexOf(' ') > -1) {
      ctx.throw('Tu nombre de la partida no puede contener espacio', 401);
    } else if (!/(?=.{4,10})/.test(nombre)) {
      ctx.throw('El nombre de la partida debe tener entre 4 y 10 caracteres', 401);
    }
    const tests = {
      largoMinimo: /(?=.{6,})/,
      minuscula: /^(?=.*[a-z])/,
      mayuscula: /(?=.*[A-Z])/,
      numero: /(?=.*[0-9])/,
      caracterEspecial: /(?=.*[!@#$%^&*_-])/,
    };
    const mensajesPosibles = {
      largoMinimo: 'mínimo 6 caracteres \n',
      minuscula: 'al menos una letra minúscula \n',
      mayuscula: 'al menos una letra mayúscula \n',
      numero: 'al menos una número \n',
      caracterEspecial: 'al menos una caracter especial \n',
    };
    const evaluaciones = [
      'minuscula',
      'mayuscula',
      'numero',
      'caracterEspecial',
      'largoMinimo',
    ];
    if (tipo === 'Seleccione una opción') {
      ctx.throw('Debe escoger un tipo de seguridad de la partida', 401);
    }
    if (tipo === 'Privada') {
      if (password.indexOf(' ') > -1) {
        ctx.throw('Tu contraseña no debe contener espacio', 401);
      }
      evaluaciones.forEach((evaluacion) => {
        const cumpleEvaluacion = tests[evaluacion].test(password);
        if (!cumpleEvaluacion) {
          ctx.throw(`Tu contraseña debe tener ${mensajesPosibles[evaluacion]}`, 401);
        }
      });
    }
    if (tipo === 'Publica') {
      password = '';
    }
    const hash = await bcrypt.hash(password, 5);
    const sala = await ctx.orm.Sala.create({
      nombre: await nombre,
      password: await hash,
      estado: await 'En Preparación',
      player1: await token.id,
      player2: await null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    ctx.body = {
      data: sala.dataValues,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('salas.edit', '/unirse/:id_sala', async (ctx) => {
  try {
    const token = ctx.request.header;
    const password = await ctx.request.body.password;
    if (token.admin) {
      ctx.throw('El admin no puede unirse a la partida', 403);
    }
    const sala = await ctx.orm.Sala.findByPk(ctx.params.id_sala);
    if (sala) {
      const password2 = await sala.password;
      if (sala.tipo === 'Publica') {
        sala.player2 = await token.id;
        sala.estado = 'En curso';
        sala.save();
      }
      if (sala.tipo === 'Privada') {
        if (!await bcrypt.compare(password, password2)) {
          ctx.throw('Contraseña incorrecta', 403);
        } else {
          sala.player2 = await token.id;
          sala.estado = 'En curso';
          sala.save();
        }
      }
      ctx.body = {
        data: sala,
      };
    }
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('matches.create', '/crear/:id_sala', async (ctx) => {
  try {
    const token = ctx.request.header;
    if (token.admin) {
      ctx.throw('El admin no puede crear la partida', 403);
    }
    const sala = await ctx.orm.Sala.findByPk(ctx.params.id_sala);
    if (!sala.estado === 'En curso') {
      ctx.throw('Debes esperar hasta que se una otro jugador', 403);
    }
    if (!sala.estado === 'Finalizado') {
      ctx.throw('La partida ya se encuentra creada', 403);
    } else {
      sala.estado = 'Finalizado';
      const match = await ctx.orm.Match.create({
        turno: 0,
        nombre: await sala.nombre,
        tipo: await sala.tipo,
        estado: 'En curso',
        player_1: await sala.player1,
        player_2: await sala.player2,
        arcilla_1: 20,
        arcilla_2: 20,
        trigo_1: 20,
        trigo_2: 20,
        mineral_1: 20,
        mineral_2: 20,
        madera_1: 20,
        madera_2: 20,
        admin_id: 0,
        current: await sala.player1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      sala.save();
      ctx.body = {
        data: match,
      };
    }
  } catch (error) {
    ctx.throw(error);
  }
});

router.get('salas.show', '/sala/:id', async (ctx) => {
  try {
    const sala = await ctx.orm.Sala.findByPk(ctx.params.id);
    ctx.body = {
      sala,
    };
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
