const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player, {
        as: 'player2',
        foreignKey: 'player_2',
      });
      this.belongsTo(models.Player, {
        as: 'player1',
        foreignKey: 'player_1',
      });
      this.belongsTo(models.Player, {
        as: 'currentPlayer',
        foreignKey: 'current',
      });
      this.hasMany(models.Play, {
        foreignKey: 'match_id',
      });
      this.hasMany(models.Tile, {
        foreignKey: 'match_id',
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
      });
    }
  }
  Match.init(
    {
      turno: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      arcilla_1: DataTypes.INTEGER,
      arcilla_2: DataTypes.INTEGER,
      trigo_1: DataTypes.INTEGER,
      trigo_2: DataTypes.INTEGER,
      mineral_1: DataTypes.INTEGER,
      mineral_2: DataTypes.INTEGER,
      madera_1: DataTypes.INTEGER,
      madera_2: DataTypes.INTEGER,
      tipo: DataTypes.STRING,
      estado: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Match',
    },
  );
  return Match;
};
