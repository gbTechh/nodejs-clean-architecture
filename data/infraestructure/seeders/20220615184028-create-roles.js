'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let roles = [
      {name:'Administrador', description:'Adminsitrador root del sistema', status:'1', createdAt:new Date(),updatedAt:new Date()},
      {name:'Soporte', description:'Rol encargado de soporte al cliente', status:'1', createdAt:new Date(),updatedAt:new Date()},
      {name:'Ventas', description:'Rol encargado de gestionar las ventas del sistema', status:'1', createdAt:new Date(),updatedAt:new Date()},
    ]

    await queryInterface.bulkInsert('Rols', roles, {});
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Rols', null, {});
   
  }
};
