'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      saleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'sale_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'sales' ,
          key: 'id',
        }
      },
      productId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'product_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'products' ,
          key: 'id',
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('salesProducts');
  }
};