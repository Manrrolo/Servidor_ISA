module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShopProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      costoTrigo: {
        type: Sequelize.INTEGER,
      },
      costoArcilla: {
        type: Sequelize.INTEGER,
      },
      costoMadera: {
        type: Sequelize.INTEGER,
      },
      costoMineral: {
        type: Sequelize.INTEGER,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ShopProducts');
  },
};
