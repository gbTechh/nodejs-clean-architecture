const response = require('../../common/errors/errorResponse');

const verifyRol = ({permissionService, usersService}) => {
  
    const roles = {
        admin: async function(req,next) {
         
            const { user } = await usersService.getUser({userId: req.user.id})
        
            const rol = user.rolId.toString();       
            if(rol !== '1'){
                throw response('No tienes los permisos para realizar esta accion',403)
            }
         
           
        }
    }
    return roles
}

module.exports = verifyRol
