'use strict';

const SalesProductModel = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true },
    productId: {type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  },{ timestamps: false, tableName: 'sales_products', underscored: true});

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Sale, { foreignKey: 'saleId' });
    SalesProduct.belongsTo(models.Product, { foreignKey: 'productId' })
  };

  return SalesProduct;
};

module.exports = SalesProductModel;