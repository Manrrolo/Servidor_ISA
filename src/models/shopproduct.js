const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShopProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  ShopProduct.init({
    name: DataTypes.STRING,
    costoTrigo: DataTypes.INTEGER,
    costoArcilla: DataTypes.INTEGER,
    costoMadera: DataTypes.INTEGER,
    costoMineral: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ShopProduct',
  });
  return ShopProduct;
};
