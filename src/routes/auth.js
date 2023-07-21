const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = new Router();

router.post('/login', async (ctx) => {
  try {
    const password1 = ctx.request.body.hash_contrasena;
    const admin = await ctx.orm.Admin.findOne({
      where: { email: ctx.request.body.email },
      include: [{ model: ctx.orm.File, attributes: ['id'] }],
    });
    const player = await ctx.orm.User.findOne({
      where: { email: ctx.request.body.email },
      include: [{ model: ctx.orm.File, attributes: ['id'] }],
    });
    if (player) {
      const password2 = await player.dataValues.hash_contrasena;
      if (!player || !(await bcrypt.compare(password1, password2))) {
        ctx.throw('Contraseña o mail incorrecto', 401);
      } else {
        const registro = await ctx.orm.Record.findAll({
          where: {
            user: player.id,
          },
        });
        const payload = {
          files: player.Files,
          nickname: player.nickname,
          id: player.id,
          admin: false,
          registros: registro,
        };
        const tokenjwt = JWT.sign(payload, `${process.env.JWT_SECRET}`, {
          expiresIn: 3600 * 5,
        });
        ctx.request.header = { access_token: tokenjwt };
        const headers = ctx.request.header;
        ctx.body = headers;
        ctx.status = 201;
      }
    } else if (admin) {
      const password3 = admin.dataValues.hash_password;
      console.log(await bcrypt.compare(password1, password3));
      if (!admin || !(await bcrypt.compare(password1, password3))) {
        ctx.throw('Contraseña o mail incorrecto', 401);
      } else {
        const players = await ctx.orm.User.findAll();
        const payload = {
          files: admin.Files,
          user: players,
          nickname: 'Admin',
          admin: true,
        };
        const tokenjwt = JWT.sign(payload, `${process.env.JWT_SECRET}`, {
          expiresIn: 3600 * 10,
        });
        ctx.request.header = { access_token: tokenjwt };
        const headers = ctx.request.header;
        ctx.body = headers;
        ctx.status = 201;
      }
    } else {
      ctx.throw('Contraseña o mail incorrecto', 401);
    }
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('players.create', '/signup', async (ctx) => {
  try {
    const bodyPassword = await ctx.request.body.password;
    const username = await ctx.request.body.nombreUsuario;
    const emails = await ctx.request.body.correo;
    if (username.indexOf(' ') > -1) {
      ctx.throw('Tu nombre de usuario no puede contener espacio', 401);
    } else if (!/(?=.{6,15})/.test(username)) {
      ctx.throw('Tu nombre de usuario debe tener entre 6 y 15 caracteres', 401);
    }
    const tests = {
      largoMinimo: /(?=.{8,})/,
      minuscula: /^(?=.*[a-z])/,
      mayuscula: /(?=.*[A-Z])/,
      numero: /(?=.*[0-9])/,
      caracterEspecial: /(?=.*[!@#$%^&*_-])/,
    };
    const mensajesPosibles = {
      largoMinimo: 'mínimo 8 caracteres \n',
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
    // Comprobar espacio
    if (bodyPassword.indexOf(' ') > -1) {
      ctx.throw('Tu contraseña no debe contener espacio', 401);
    }
    evaluaciones.forEach((evaluacion) => {
      const cumpleEvaluacion = tests[evaluacion].test(bodyPassword);
      if (!cumpleEvaluacion) {
        ctx.throw(
          `Tu contraseña debe tener ${mensajesPosibles[evaluacion]}`,
          401,
        );
      }
    });
    // Validar email
    if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]+$/.test(emails)) {
      ctx.throw('Debe ingresar un correo válido', 401);
    }
    const playerverificacion = await ctx.orm.User.findOne({
      where: { nickname: username },
    });
    const playerverificacion2 = await ctx.orm.User.findOne({
      where: { email: emails },
    });
    if (playerverificacion) {
      ctx.throw('Nombre de usuario se encuentra ocupado', 401);
    }
    if (playerverificacion2) {
      ctx.throw('Correo se encuentra ocupado', 401);
    }
    const hash = await bcrypt.hash(bodyPassword, 5);
    const player = await ctx.orm.User.create({
      nickname: username,
      email: emails,
      hash_contrasena: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(player);
    ctx.status = 201;
    ctx.body = {
      data: player.dataValues,
      status: 201,
      message: 'El usuario fue creado con exito',
    };
  } catch (error) {
    ctx.throw(error);
  }
});

router.post('/logout', async (ctx) => {
  try {
    ctx.session.sessionid = undefined;
    ctx.status = 200;
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
