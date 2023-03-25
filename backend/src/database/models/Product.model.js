'use strict';

const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT(4,2),
    urlImage: DataTypes.STRING,
  },{ timestamps: false, tableName: 'products', underscored: true});

  Product.associate = (models) => {
    Product.hasMany(models.SalesProduct, { foreignKey: 'productId' });
  };

  return Product;
};

module.exports = ProductModel;