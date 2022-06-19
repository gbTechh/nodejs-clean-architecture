const mapper = require('../../mapper');
const response = require('../../../common/errors/errorResponse'); 
const ModuleDomainModel = require('../../../domain/modules/model');


const queryForGetUser = ({ moduleId }) => {
  const queries = {};
  if (moduleId) {
    queries.id = moduleId;
   
  }
  return queries
};

const moduleStore = {
  async createModule({
    name,
    description,
    status
  }){
    const { Module } = this.getModels();
///escribir los datos del modelo
    const newModule = {
      name,
      description,
      status
    }
    const moduleDoc = await Module.create(newModule);
    return mapper.toDomainModel(moduleDoc, ModuleDomainModel);
  },
  async getModuleJoinTable(code){
    const { sequelize } = this.getModels();

    const moduleDoc = await sequelize.query(`SELECT * FROM Modules JOIN Tables ON Modules.tableId = Tables.id where Tables.code = '${code}'`)  
    return moduleDoc[0];
  },
  async getAllModules(){
    const { Module } = this.getModels();
    const moduleDoc = await Module.findAll();

    if(!moduleDoc){     
      throw response('Modulos no encontrados', 404)
    }
    let data = moduleDoc.map(doc => mapper.toDomainModel(doc, ModuleDomainModel) )
    
    return data;
    
  },

  async getModuleById({    
    moduleId,  
  }) {
    
    const { Module } = this.getModels();   
    const moduleDoc = await Module.findOne({where:queryForGetUser({     
      moduleId
    })})

    if (!moduleDoc) {
      throw response('Module no encontrado', 404)
    }
    return mapper.toDomainModel(moduleDoc, ModuleDomainModel);
  },

  async editModule({moduleId, body}){
    const { Module } = this.getModels();
    let moduleDoc = await Module.findByPk(moduleId)
    
    if(moduleDoc !== null){
      moduleDoc.set(body)
      moduleDoc = await moduleDoc.save();
    }else{
      throw response('Modulo no encontrado', 404)
    }

    return mapper.toDomainModel(moduleDoc, ModuleDomainModel);
  },

  async deleteModule({moduleId, force}){
    const { Module } = this.getModels();
    const moduleDoc = await Module.destroy({
      where: {
        id: moduleId
      },
      force: force
    })

    if(!moduleDoc){
      throw response('Usuario no encontrado', 404)
    }

    return true;
  }
  
  
  
}

module.exports.init = function init(sequelize,{ Module , Table}){
  return Object.assign(Object.create(moduleStore),{
    getModels(){
      return {
        sequelize,
        Module,
        Table
      }
    }
  })
}

