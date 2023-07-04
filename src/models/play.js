const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Play extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        foreignKey: 'player',
      });
      this.belongsTo(models.Tile, {
        as: 'coordenada_i',
        foreignKey: 'coordenada_inicial',
      });
      this.belongsTo(models.Tile, {
        as: 'coordenada_f',
        foreignKey: 'coordenada_final',
      });
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
      });
    }
  }
  Play.init(
    {
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Play',
    },
  );
  return Play;
};
