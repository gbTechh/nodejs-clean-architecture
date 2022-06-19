'use strict';



module.exports = {
  async up (queryInterface, Sequelize) {

    let roles_has_modules = [
      {
        module_id:'1',
        rol_id:'1',       
        r:0,
        w:0,
        u:0,
        d:0,
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        module_id:'2',
        rol_id:'1',   
        r:0,
        w:0,
        u:0,
        d:0,    
        createdAt:new Date(),updatedAt:new Date()
      },      
      {
        module_id:'1',
        rol_id:'2',    
        r:0,
        w:0,
        u:0,
        d:0,   
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        module_id:'2',
        rol_id:'2',    
        r:0,
        w:0,
        u:0,
        d:0,   
        createdAt:new Date(),updatedAt:new Date()
      },      
      {
        module_id:'1',
        rol_id:'3',    
        r:0,
        w:0,
        u:0,
        d:0,   
        createdAt:new Date(),updatedAt:new Date()
      },
      {
        module_id:'2',
        rol_id:'3',    
        r:0,
        w:0,
        u:0,
        d:0,   
        createdAt:new Date(),updatedAt:new Date()
      },     
      
     
    ]

    await queryInterface.bulkInsert('Roles_has_modules', roles_has_modules, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles_has_modules', null, {});
  }
};
