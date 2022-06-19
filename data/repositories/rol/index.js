const mapper = require('../../mapper');
const response = require('../../../common/errors/errorResponse'); 
const RolDomainModel = require('../../../domain/rol/model');


const queryForGetUser = ({ rolId }) => {
  const queries = {};
  if (rolId) {
    queries.id = rolId;
   
  }
  return queries
};

const rolStore = {
  async createRol({
    name,
    description,
    status
  }){
    const { Rol } = this.getModels();
///escribir los datos del modelo
    const newRol = {
      name,
      description,
      status
    }
    const rolDoc = await Rol.create(newRol);
    return mapper.toDomainModel(rolDoc, RolDomainModel);
  },

  async getAllRoles(){
    const { Rol } = this.getModels();
    const rolDoc = await Rol.findAll();

    if(!rolDoc){     
      throw response('Roles no encontrados', 404)
    }
    let data = rolDoc.map(doc => mapper.toDomainModel(doc, RolDomainModel) )
    
    return data;
    
  },

  async getRolById({    
    rolId,  
  }) {
    
    const { Rol } = this.getModels();   
    const rolDoc = await Rol.findOne({where:queryForGetUser({     
      rolId
    })})

    if (!rolDoc) {
      throw response('Rol no encontrado', 404)
    }
    return mapper.toDomainModel(rolDoc, RolDomainModel);
  },

  async editRol({rolId, body}){
    const { Rol } = this.getModels();
    let rolDoc = await Rol.findByPk(rolId)
    
    if(rolDoc !== null){
      rolDoc.set(body)
      rolDoc = await rolDoc.save();
    }else{
      throw response('Rol no encontrado', 404)
    }

    return mapper.toDomainModel(rolDoc, RolDomainModel);
  },

  async deleteRol({rolId, force}){
    const { Rol } = this.getModels();
    const rolDoc = await Rol.destroy({
      where: {
        id: rolId
      },
      force: force
    })

    if(!rolDoc){
      throw response('Usuario no encontrado', 404)
    }

    return true;
  }
  
  
  
}

module.exports.init = function init({ Rol }){
  return Object.assign(Object.create(rolStore),{
    getModels(){
      return {
        Rol        
      }
    }
  })
}

