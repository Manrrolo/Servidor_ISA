module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      turno: {
        type: Sequelize.INTEGER,
      },
      arcilla_1: {
        type: Sequelize.INTEGER,
      },
      arcilla_2: {
        type: Sequelize.INTEGER,
      },
      trigo_1: {
        type: Sequelize.INTEGER,
      },
      trigo_2: {
        type: Sequelize.INTEGER,
      },
      mineral_1: {
        type: Sequelize.INTEGER,
      },
      mineral_2: {
        type: Sequelize.INTEGER,
      },
      madera_1: {
        type: Sequelize.INTEGER,
      },
      madera_2: {
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
      player_2: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      player_1: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      current: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
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
      estado: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Matches');
  },
};
