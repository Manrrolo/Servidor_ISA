const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
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
  Record.init(
    {
      response: DataTypes.STRING,
      fecha: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Record',
    },
  );
  return Record;
};
