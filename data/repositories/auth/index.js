const util = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mapper = require('../../mapper');
const {
  USER_TOKEN_EXPIRATION,  
} = require('../../../common/constants');
const response = require('../../../common/errors/errorResponse'); 
const { SECRET } = require('../../../config')

const DomainToken = require('../../../domain/token/model');


module.exports.init = function init() {
  async function comparePassword(password, dbPassword) {
    try {
      const match = await bcrypt.compare(password, dbPassword);
      if (!match) {
        throw new Error('Error de autenticacion')
      }
      return match;
    } catch (error) {
      console.log(error)
      throw new Error('Creedenciales no coinciden')
    }
  }

  async function createUserToken(user){
    const token = {
      accessToken: jwt.sign({
        email: user.email,
        id: user.id,
        rolId: user.rolId,
        fullname: user.fullname,
      },SECRET,{
        expiresIn: USER_TOKEN_EXPIRATION
      }),
      tokenType: 'Bearer',
      expiresIn: USER_TOKEN_EXPIRATION,
    };
    return mapper.toDomainModel(token, DomainToken)
  }

  async function verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  function verifyTokenSync(token) {
    return jwt.verify(token, SECRET);
  }  

  function getToken(auth) {
    if(!auth) {
        throw response('No viene token',403);        
    }

    if(auth.indexOf('Bearer ') === -1){
        throw response('Formato inválido',403);
    }

    let token = auth.replace('Bearer ', '')

    return token;
}

  return {
    comparePassword,
    createUserToken,
    verifyToken,
    verifyTokenSync, 
    getToken,
  };
};
