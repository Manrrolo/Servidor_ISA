const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('Auth routes', () => {

  describe('POST auth/signup', () => {
    const postSignup = async (body) => request
          .post('/auth/signup')
          .send(body);
    describe('Invalid Signup', () => {
      const body = {
        email: 'iic2513@uc.cl',
        nickname: 'web',
        password: 'no hay',
      };
      
      it('should not create a player', async () => {
        const originalCount = await app.context.orm.Player.count();
        await postSignup(body);
        expect(await app.context.orm.Player.count()).toBe(originalCount);
      });
      const body2 = {
        email: 'iic2513@uc.cl',
        nickname: 'web',
        password: 'Manuel.1903'
      };
      it('Contraseña debe contener un caracter especial', async () => {
        const response = await postSignup(body2);
        expect(response.status).toBe(401);
      })
    })
    describe('Valid signup', () => {
      const body = {
        nombreUsuario: 'Manrrolo56',
        correo: 'Manuel.sc19@hotmail.com',
        password: 'Manuel@1903',
      };
      it('should return a 201 response', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(201);
      });

      it('should create a player', async () => {
        const originalCount = await app.context.orm.Player.count();
        await postSignup(body);
        expect(await app.context.orm.Player.count()).toBe(originalCount + 1);
      });
    });

  });
  describe('POST auth/login', () => {
    const postSignup = async (body) => request.post('/auth/login').send(body);

    describe('Valid signup', () => {
      const body = {
        email: 'manuel.sc@uc.cl',
        hash_contrasena: '12345',
      };
      it('should return a 201 response', async () => {
        const response = await postSignup(body);
        expect(response.status).toBe(201);
      });
    });

    describe('Invalid Signup', () => {
      const body = {
        email: 'iic2513@uc.cl',
        hash_contrasena: 'web',
      };

    it('should return a 401 response', async () => {
      const response = await postSignup(body);
      expect(response.status).toBe(401);
    });
    });
  });

});