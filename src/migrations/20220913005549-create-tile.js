module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coordenada: {
        type: Sequelize.STRING,
      },
      player: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      defensas: {
        type: Sequelize.INTEGER,
      },
      tropas: {
        type: Sequelize.INTEGER,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      cantidad_recursos: {
        type: Sequelize.INTEGER,
      },
      nivel: {
        type: Sequelize.INTEGER,
      },
      match_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: { model: 'Matches', key: 'id' },
      },
      lista: {
        allowNull: false,
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
    await queryInterface.dropTable('Tiles');
  },
};
