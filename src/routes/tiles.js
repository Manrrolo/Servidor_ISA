const Router = require('koa-router');

const router = new Router();

router.get('tiles.show', '/', async (ctx) => {
  try {
    const tiles = await ctx.orm.Tile.findAll({
      include: [
        { model: ctx.orm.Match },
        { model: ctx.orm.Player },
      ],
    });
    ctx.body = tiles;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.get('tiles.show', '/match/:id', async (ctx) => {
  try {
    const tiles = await ctx.orm.Tile.findAll({
      include: [
        { model: ctx.orm.Match, where: { id: ctx.params.id } },
        { model: ctx.orm.Player },
      ],
    });
    ctx.body = tiles;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.post('tiles.create', '/', async (ctx) => {
  try {
    let tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    console.log(ctx.request.body);
    console.log(tiles[0].dataValues.id + 1);
    const tile1 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'A1',
      defensas: 10,
      tropas: 1,
      tipo: 'castillo',
      cantidad_recursos: 0,
      nivel: 1,
      lista: 'A1 A2',
      createdAt: new Date(),
      updatedAt: new Date(),
      match_id: ctx.request.body.match_id,
      player: ctx.request.body.player_1,
    });
    console.log(tile1);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile2 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'A2',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A1 A3 B1 B2',
    });
    console.log(tile2);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile3 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'A3',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A4 A2 B2 B3',
    });
    console.log(tile3);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile4 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'A4',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A3 B3 B4',
    });
    console.log(tile4);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile5 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'B1',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A1 A2 B2 C1',
    });
    console.log(tile5);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile6 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'B2',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A2 A3 B1 B3 C1 C2',
    });
    console.log(tile6);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile7 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'B3',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A3 A4 B2 B4 C2 C3',
    });
    console.log(tile7);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile8 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'B4',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'A4 B3 C3 C4',
    });
    console.log(tile8);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile9 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'C1',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'B1 B2 C2 D1',
    });
    console.log(tile9);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile10 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'C2',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'B2 B3 C1 C3 D1 D2',
    });
    console.log(tile10);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile11 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'C3',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'B3 B4 C2 C4 D2 D3',
    });
    console.log(tile11);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile12 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'C4',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'B4 C3 D3 D4',
    });
    console.log(tile12);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile13 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'D1',
      player: ctx.request.body.player_1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'C1 C2 D2 E1',
    });
    console.log(tile13);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile14 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'D2',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'C2 C3 D1 D3 E1 E2',
    });
    console.log(tile14);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile15 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'D3',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'C3 C4 D2 D4 E2 E3',
    });
    console.log(tile15);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile16 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'D4',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'C4 D3 E3 E4',
    });
    console.log(tile16);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile17 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'E1',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'D1 D2 E2',
    });
    console.log(tile17);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile18 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'E2',
      player: 1,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'D2 D3 E1 E3',
    });
    console.log(tile18);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile19 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'E3',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 0,
      tipo: 'casa',
      cantidad_recursos: 1,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'D3 D4 E2 E4',
    });
    console.log(tile19);
    tiles = await ctx.orm.Tile.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const tile20 = await ctx.orm.Tile.create({
      id: tiles[0].dataValues.id + 1,
      coordenada: 'E4',
      player: ctx.request.body.player_2,
      defensas: 10,
      tropas: 1,
      tipo: 'castillo',
      cantidad_recursos: 0,
      nivel: 1,
      match_id: ctx.request.body.match_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      lista: 'D4 E3',
    });
    console.log(tile20);
    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
