module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('ShopProducts', [
    {
      id: 1,
      name: 'Caballero',
      costoTrigo: 2,
      costoArcilla: 0,
      costoMadera: 0,
      costoMineral: 1,
      descripcion:
        'Ataque:3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Mejora de casa',
      costoTrigo: 0,
      costoArcilla: 2,
      costoMadera: 3,
      costoMineral: 1,
      descripcion:
        'Al mejorar otorga una unidad adicional de recursos por turno y se mejora su defensa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Mejora de castillo',
      costoTrigo: 0,
      costoArcilla: 2,
      costoMadera: 2,
      costoMineral: 5,
      descripcion:
        'Mejora la defensa del castillo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('ShopProducts', null, {}),
};
