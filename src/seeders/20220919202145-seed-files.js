module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Files', [
      {
        id: 0,
        nombre: 'Prueba0Memoria-integrada-ISA-Intervial-2020',
        tipo: 'PDF',
        user: 1,
        admin_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete('Files', null, {}),
};
