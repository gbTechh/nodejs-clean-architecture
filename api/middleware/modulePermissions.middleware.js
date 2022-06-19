const response = require('../../common/errors/errorResponse');
const { decodeHeader } = require('../utils/decodeHeader');



const checkPermission = (codeModule, { moduleService, permissionService}) => {

  const permissions = {
    read:async function modulesPermisison(req, next) {       
          const user = decodeHeader(req);
          const result = await moduleService.getModuleJoinTable(codeModule)
          const permissions = await permissionService.permissionRead({
            idModule: result[0].id,
            idRol: user.rolId
          })
        
          if(permissions === 0 || permissions === false){
      
            throw response('No tienes los permisos para realizar esta accion', 401)
          }   
    }   
  }
 
  return permissions
}



module.exports = checkPermission