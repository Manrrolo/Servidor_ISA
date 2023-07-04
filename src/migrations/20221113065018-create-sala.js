module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Salas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      player1: {
        type: Sequelize.INTEGER,
      },
      player2: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Salas');
  },
};
