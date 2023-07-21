const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user',
      });
      this.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
      });
    }
  }
  File.init(
    {
      nombre: DataTypes.STRING,
      tipo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'File',
    },
  );
  return File;
};
