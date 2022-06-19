'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasOne(models.User, {as:'rol',foreignKey: 'rolId'});

      Rol.belongsToMany(models.Module, {through: "roles_has_modules",
      as: "modulesr",
      foreignKey: "rol_id"});
    
    }
  }
  Rol.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rol',
    paranoid: true,
  });
  return Rol;
};