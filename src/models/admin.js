const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Match, {
        foreignKey: 'admin_id',
      });
    }
  }
  Admin.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash_password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
