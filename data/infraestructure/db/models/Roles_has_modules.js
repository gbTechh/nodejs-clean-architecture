'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles_has_modules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles_has_modules.hasOne(models.Permission, {as:'rolHasModuleId',foreignKey: 'rolHasModuleId'});
    }
  }
  Roles_has_modules.init({
    module_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    r: DataTypes.INTEGER,
    w: DataTypes.INTEGER,
    u: DataTypes.INTEGER,
    d: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Roles_has_modules',
    paranoid: true,
  });
  return Roles_has_modules;
};