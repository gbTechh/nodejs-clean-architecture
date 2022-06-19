const mapper = require('../../mapper');
const response = require('../../../common/errors/errorResponse'); 
const TableDomainModel = require('../../../domain/tables/model');


const tableStore = {
  
  async getAllTables(){

    const { Tables } = this.getModels();   
    const tableDoc = await Tables.findAll()
    if (!tableDoc) {
      throw response('Tablas no encontradas', 404)
    }

    let data = tableDoc.map(doc => mapper.toDomainModel(doc, TableDomainModel) )
    
    return data;

    
  },
 
  
}

module.exports.init = function init({ Table }){
  return Object.assign(Object.create(tableStore),{
    getModels(){
      return {
        Table,
      }
    }
  })
}

