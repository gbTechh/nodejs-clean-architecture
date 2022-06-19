const bcrypt = require('bcrypt');

'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol);
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    document: {
      type: DataTypes.INTEGER,
      unique: true
    },
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    rolId: DataTypes.STRING,
    token: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(usuario) { 
          usuario.password = User.prototype.hashPassword(usuario.password);
      },
      beforeBulkUpdate(usuario) { 
        if(usuario.attributes.password){
          usuario.attributes.password = User.prototype.hashPassword(usuario.attributes.password);
        }
      }
    },
    sequelize,
    modelName: 'User',
    paranoid: true,
  });

  User.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null );
  }

  User.prototype.validarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};