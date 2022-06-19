'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Modules', {
      fields:['tableId'],
      type:'foreign key',
      name:'module_table_association',
      references:{
        table:'Tables',
        field:'id'
      }
    })
   },
 
   async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint('Modules', 'module_table_association')
   }
};
