module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Records', [
      {
        response: 'Prueba0Memoria-integrada-ISA-Intervial-2020',
        fecha: new Date(),
        user: 1,
        admin_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Records', null, {}),
};
