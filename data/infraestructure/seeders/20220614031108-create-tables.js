'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let tables = [
      {
        name_table:'Rol',
        isModule:true,
        code:'rol',
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name_table:'User',
        isModule:true,
        code:'user',
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name_table:'Module',
        isModule:false,
        code:'module',
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        name_table:'Tables',
        isModule:false,
        code:'table',
        createdAt:new Date(),updatedAt:new Date()
      },      
      
    ]

    await queryInterface.bulkInsert('Tables', tables, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tables', null, {});
  }
};
