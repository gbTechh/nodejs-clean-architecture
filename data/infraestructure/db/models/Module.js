'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Module.belongsToMany(models.Rol, {through: "roles_has_modules",
      as: "rolesm",
      foreignKey: "module_id",});
      Module.belongsTo(models.Table);
    }
  }
  Module.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
    status: DataTypes.INTEGER, 
    tableId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Module',
    paranoid: true,
  });
  return Module;
};