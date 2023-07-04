module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coordenada_inicial: {
        type: Sequelize.INTEGER,
        references: { model: 'Tiles', key: 'id' },
      },
      coordenada_final: {
        type: Sequelize.INTEGER,
        references: { model: 'Tiles', key: 'id' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      estado: {
        type: Sequelize.STRING,
      },
      player: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      match_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'Matches', key: 'id' },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Plays');
  },
};
