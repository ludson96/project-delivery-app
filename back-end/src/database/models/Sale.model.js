'use strict';

const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT(4,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING
  },{ timestamps: false, tableName: 'sales', underscored: true});

  Sale.associate = (models) => {
    Sale.hasMany(models.SalesProduct, { foreignKey: 'saleId'  })
    Sale.belongsTo(models.User, { foreignKey: 'userId' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId' });
  };

  return Sale;
};

module.exports = SaleModel;