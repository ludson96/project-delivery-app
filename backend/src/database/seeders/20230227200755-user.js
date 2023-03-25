'use strict';

const user1 = {
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
}

const user2 = {
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller',
}

const user3 = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
}

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [user1, user2, user3]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
