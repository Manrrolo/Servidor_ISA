module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Plays', [
    {
      id: 0,
      coordenada_inicial: 0,
      coordenada_final: 1,
      player: 0,
      match_id: 0,
      estado: 'Realizado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 1,
      coordenada_inicial: 39,
      coordenada_final: 35,
      player: 2,
      match_id: 1,
      estado: 'Realizado',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Plays', null, {}),
};
