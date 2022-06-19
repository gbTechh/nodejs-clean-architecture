'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
    let modules = [
      {
        name:'User',
        description:'Modulo de panel de usuarios', status:'1',
        tableId:'2', createdAt:new Date(),updatedAt:new Date()
      },
      {
        name:'Roles',
        description:'Modulo de gestion de roles de usuario',
        status:'1',
        tableId:'1',
        createdAt:new Date(),updatedAt:new Date()
      },      
    ]

    await queryInterface.bulkInsert('Modules', modules, {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Modules', null, {});
  }
};
