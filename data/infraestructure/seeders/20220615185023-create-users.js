'use strict';

const {faker} = require('@faker-js/faker')

module.exports = {
  async up (queryInterface, Sequelize) {

    let users = [
      {
        name:faker.internet.userName(),
        lastname: faker.name.lastName(),
        phone: 	faker.phone.phoneNumber(),
        address:	faker.address.city(),
        document: '78256123',
        rolId: '1',
        token:'',
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name:faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: 	faker.phone.phoneNumber(),
        address:	faker.address.city(),
        document: '789446123',
        rolId: '2',
        token:'',
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name:faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: 	faker.phone.phoneNumber(),
        address:	faker.address.city(),
        document: '75456123',
        rolId: '3',
        token:'',
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name:faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: 	faker.phone.phoneNumber(),
        address:	faker.address.city(),
        document: '189456123',
        rolId: '2',
        token:'',
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name:faker.name.firstName(),
        lastname: faker.name.lastName(),
        phone: 	faker.phone.phoneNumber(),
        address:	faker.address.city(),
        document: '329456123',
        rolId: '1',
        token:'',
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt:new Date(),updatedAt:new Date()
      },
     
    ]

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
