const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
  await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
  await app.context.orm.sequelize.close();
});

describe('plays routes', () => {
  describe('POST plays', () => {
     const PostPlays = async (token) =>
       request
         .post(`/plays`)
         .set('Authorization', `bearer ${token}`);
     let token;
     beforeAll(async () => {
       const loginResponse = await request.post('/auth/login').send({
         email: 'manuel.sc@uc.cl',
         password: '12345',
       });
       
       token = loginResponse.body.access_token;
     });

    describe('no autorizado', () => {
      const body = {
        casillaOrigen: 'A1',
        match_id: 1,
        casillaDestino: 'A1',
      };

      it('Casilla final no es colindante ', async () => {
        const response = await PostPlays(body);
        expect(response.status).toBe(403);
      });
    });
  });
});
