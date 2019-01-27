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
     },
     {
      id: 12,
      firstName: 'Nicole',
      lastName: 'Kidman',
      phoneNumber: '6645763289',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      firstName: 'George',
      lastName: 'Jungle',
      phoneNumber: '8134367128',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      firstName: 'James',
      lastName: 'Hancock',
      phoneNumber: '1234567',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      firstName: 'Jessica',
      lastName: 'Alba',
      phoneNumber: '9998675309',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      firstName: 'Kate',
      lastName: 'Beckinsale',
      phoneNumber: '0987654321',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      firstName: 'ZZ',
      lastName: 'Top',
      phoneNumber: '7864321823',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      firstName: 'Shonkala',
      lastName: 'Williams',
      phoneNumber: '4727477721',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 10,
      firstName: 'Jim',
      lastName: 'Kirk',
      phoneNumber: '7763248734',
      lastVisit: new Date(),
      noShow: false,
      stylistId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 11,
      firstName: 'Eric',
      lastName: 'Cartman',
      phoneNumber: '8809809000',
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

