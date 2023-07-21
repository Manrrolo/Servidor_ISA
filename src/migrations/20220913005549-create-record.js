module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Records', {
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
      response: {
        type: Sequelize.STRING,
      },
      fecha: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Records');
  },
};
