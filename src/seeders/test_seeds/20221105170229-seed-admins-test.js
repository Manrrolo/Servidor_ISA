module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Admins', [
      {
        id: 0,
        nickname: 'ADMIN',
        email: 'admin@admin.com',
        hash_password:
          '$2a$05$YdbpCCM1aoeHqRTUNmeDZ.m4Cu4MySeys77NsfMiN7bUvFFwEvwky',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Admins', null, {}),
};
