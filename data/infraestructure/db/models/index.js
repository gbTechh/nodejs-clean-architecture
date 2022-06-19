const UserDao = require('./User');
const RolDao = require('./Rol');
const ModuleDao = require('./Module');
const RolHasModuleDao = require('./Roles_has_modules');
const TableDao = require('./Table');


module.exports.init = (sequelize, DataTypes) => {

  const models = {
    User: UserDao(sequelize, DataTypes),
    Rol: RolDao(sequelize, DataTypes),
    Module: ModuleDao(sequelize, DataTypes),   
    Roles_has_modules: RolHasModuleDao(sequelize, DataTypes),   
    Table: TableDao(sequelize, DataTypes),   

  }



  return models
 

  
};
