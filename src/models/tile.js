const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match, {
        foreignKey: 'match_id',
      });
      this.belongsTo(models.Player, {
        foreignKey: 'player',
      });
      this.hasMany(models.Play, {
        foreignKey: 'coordenada_inicial',
      });
      this.hasMany(models.Play, {
        foreignKey: 'coordenada_final',
      });
    }
  }
  Tile.init(
    {
      coordenada: DataTypes.STRING,
      defensas: DataTypes.INTEGER,
      tropas: DataTypes.INTEGER,
      tipo: DataTypes.STRING,
      cantidad_recursos: DataTypes.INTEGER,
      nivel: DataTypes.INTEGER,
      lista: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tile',
    },
  );
  return Tile;
};
