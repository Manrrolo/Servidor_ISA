module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        id: 0,
        nickname: 'Manrrolo',
        email: 'manuel.sc@uc.cl',
        hash_contrasena:
          '$2a$05$YdbpCCM1aoeHqRTUNmeDZ.m4Cu4MySeys77NsfMiN7bUvFFwEvwky',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        nickname: 'Felip',
        email: 'felipe.sc@uc.cl',
        hash_contrasena:
          '$2a$05$rHh/KpvaakAyyFXBoLMkN.N.elOzS3UGCwRqWWMkj8xaR.6RoHDKO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
