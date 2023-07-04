module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      id: 0,
      nickname: 'manrrolo',
      email: 'manuel.sc@uc.cl',
      hash_contrasena: '$2a$05$YdbpCCM1aoeHqRTUNmeDZ.m4Cu4MySeys77NsfMiN7bUvFFwEvwky',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      nickname: 'fsazo',
      email: 'fsazo@uc.cl',
      hash_contrasena: '$2a$05$rHh/KpvaakAyyFXBoLMkN.N.elOzS3UGCwRqWWMkj8xaR.6RoHDKO',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      nickname: 'francobrice',
      email: 'fbrice@uc.cl',
      hash_contrasena: '$2a$05$YdbpCCM1aoeHqRTUNmeDZ.m4Cu4MySeys77NsfMiN7bUvFFwEvwky',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
