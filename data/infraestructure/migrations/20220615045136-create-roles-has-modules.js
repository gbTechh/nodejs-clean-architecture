'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles_has_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      module_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Modules",
          key: "id"
        }
      },
      rol_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Rols",
          key: "id"
        }
      },
      r:{
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
      w:{
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
      u:{
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
      d:{
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        default:null, 
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles_has_modules');
  }
};