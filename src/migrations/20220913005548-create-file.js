module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      user: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Admins', key: 'id' },
      },
      nombre: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Files');
  },
};
