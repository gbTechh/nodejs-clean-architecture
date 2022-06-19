const response = require('../../../common/errors/errorResponse'); 
const RolDomainModel = require('../../../domain/permission/model');
const mapper = require('../../mapper');

const roles_has_modulesStore = {

  // async listModulesPermission(){
  //   const { Roles_has_modules } = this.getModels();

  //   const dataDoc = await Roles_has_modules.
  // },

  async getPermissionByModule(idModule){
    const { Roles_has_modules } = this.getModels();
    const permissionDoc = await Roles_has_modules.findAll({where:{module_id: idModule}})

    if (!permissionDoc) {
      throw response('Modulo no encontrado', 404)
    }
    let data = permissionDoc.map(doc => mapper.toDomainModel(doc, RolDomainModel) )
    
    return data;
  },
  async createRolHasModule(array){
    const { Roles_has_modules } = this.getModels();
///escribir los datos del modelo

    await array.map(row => {
      Roles_has_modules.create(row);
    }) 
    return true
  },

  async updatePermissionRol({rolId, body}){
    const { Roles_has_modules } = this.getModels();

    try {
      body.map(row => {
        Roles_has_modules.update(
          row,
          {
            where: { rol_id: rolId, module_id: row.module_id },
          }
        );
      })
    } catch (error) {
      console.log(error)
      throw response('Hubo un error al cambiar los permisos', 404)
   
    }
    

    return true
  },

  async deleteRolHasModule({rolId, force = true}){
    const { Roles_has_modules } = this.getModels();
    const rolDoc = await Roles_has_modules.destroy({
      where: {
        rol_id: rolId
      },
      force: force
    })

    if(!rolDoc){
      throw response('Usuario no encontrado', 404)
    }

    return true;
  },
  
  async deleteRolHasModuleInModule({moduleId, force = true}){
    const { Roles_has_modules } = this.getModels();
    const rolDoc = await Roles_has_modules.destroy({
      where: {
        module_id: moduleId
      },
      force: force
    })

    if(!rolDoc){
      throw response('Usuario no encontrado', 404)
    }

    return true;
  }
  
  
}

module.exports.init = function init({ Roles_has_modules }){
  return Object.assign(Object.create(roles_has_modulesStore),{
    getModels(){
      return {
        Roles_has_modules        
      }
    }
  })
}

