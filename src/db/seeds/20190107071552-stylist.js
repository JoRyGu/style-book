'use strict';
const hashPassword = require('../../../helpers/hashPasswordSync');
const hashedPassword = hashPassword('password');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stylists', [{
      id: 1,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@fake.net',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Stylists', null, {});
  }
};

