const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.File, {
        foreignKey: 'user',
      });
      this.hasMany(models.Record, {
        foreignKey: 'user',
      });
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      hash_contrasena: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
