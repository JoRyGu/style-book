'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Clients', [
     {
       id: 1,
       firstName: 'Josh',
       lastName: 'Gude',
       phoneNumber: '8132678213',
       email: 'lost12487@gmail.com',
       lastVisit: null,
       noShow: false,
       stylistId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       id: 2,
       firstName: 'Cindi',
       lastName: 'Gude',
       phoneNumber: '8132677777',
       email: null,
       lastVisit: new Date(),
       noShow: false,
       stylistId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       id: 3,
       firstName: 'Colbie',
       lastName: 'Gude',
       phoneNumber: '8134367127',
       email: 'colbie@gmail.com',
       lastVisit: new Date(),
       noShow: false,
       stylistId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ])
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Clients', null, {});
  }
};

