'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 
      Table.hasOne(models.Module, {foreignKey: 'tableId'});
    }
  }

  Table.init({
    name_table: DataTypes.STRING,
    isModule: DataTypes.BOOLEAN,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Table',
  });
  
  return Table;
};