const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Sala.init(
    {
      nombre: DataTypes.STRING,
      password: DataTypes.STRING,
      estado: DataTypes.STRING,
      player1: DataTypes.INTEGER,
      player2: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Sala',
    },
  );
  return Sala;
};
