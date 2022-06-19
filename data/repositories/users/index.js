const mapper = require('../../mapper');
const response = require('../../../common/errors/errorResponse'); 
const UserDomainModel = require('../../../domain/users/model');


const queryForGetUser = ({ userEmail, userId }) => {
  const queries = {};
  if (userId) {
    queries.id = userId;
   
  }
  if (userEmail) {
    queries.email = userEmail;
    
  }
  return queries
};

const userStore = {
  async createUser({
    name,
    lastname,
    document,
    phone,
    address,
    rolId,
    token,
    email,
    password,
  }){
    const { User } = this.getModels();
///escribir los datos del modelo
    const newUser = {
      name,
      lastname,
      document,
      phone,
      address,
      rolId,
      token,
      email,
      password,
    }
    const userDoc = await User.create(newUser);
    return mapper.toDomainModel(userDoc, UserDomainModel);
  },

  async getAllUsers(){
    const { User } = this.getModels();
    const userDoc = await User.findAll();

    if(!userDoc){     
      throw response('Usuario no encontrado', 404)
    }
    let data = userDoc.map(doc => mapper.toDomainModel(doc, UserDomainModel) )
    
    return data;
  },

  async getUser({    
    userId,
    userEmail
  }) {
    
    const { User } = this.getModels();   
    const userDoc = await User.findOne({where:queryForGetUser({     
      userId,
      userEmail
    })})
   
    if (!userDoc) {
      throw response('Usuario no encontrado', 404)
    }
    return mapper.toDomainModel(userDoc, UserDomainModel);
  },

  async editUser({userId, body}){
    const { User } = this.getModels();
    let userDoc = await User.findByPk(userId)
    
    if(userDoc !== null){
      userDoc.set(body)
      userDoc = await userDoc.save();
    }else{
      throw response('Usuario no encontrado', 404)
    }

    return mapper.toDomainModel(userDoc, UserDomainModel);
  },

  async deleteUser({userId, force}){
    const { User } = this.getModels();
    const userDoc = await User.destroy({
      where: {
        id: userId
      },
      force: force
    })

    if(!userDoc){
      throw response('Usuario no encontrado', 404)
    }

    return true;
  }
  
  
  
}

module.exports.init = function init({ User }){
  return Object.assign(Object.create(userStore),{
    getModels(){
      return {
        User,
      }
    }
  })
}

