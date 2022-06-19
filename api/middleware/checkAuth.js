const verifyRol = require('./rol.middleware');

const response = require('../../common/errors/errorResponse');
const { decodeHeader } = require('../utils/decodeHeader');
const checkRoles = require('./modulePermissions.middleware')


const check = {
  own: function(req, owner) {
      const decoded = decodeHeader(req);        
      owner = parseInt(owner, 10)
      //COMPORPBARSI ES O NO PROPIO
      if(decoded.id_person !== owner){
          throw response('No tienes los permisos para realizar esta accion', 401)
      }
  },
  logged: function(req,res,next) {
      return decodeHeader(req); 
  },

}



module.exports = function checkAuth(action, services, code) {

    function middleware(req, res, next) {
        switch (action) {
            case 'auth':  
                check.logged(req,res,next);   
                next();            
                break;
            case 'own-update': 
                const owner = req.body.id;
                check.own(req, owner);  
                next();            
                break;  
            case 'isAdmin':                
                verifyRol(services).admin(req,next)
                    .then(next())
                    .catch(e => next(e))
                      
                break;      
            case 'permissionRead':                
                checkRoles(code, services).read(req,next)
                    .then(e => {
                        next(e)
                    })
                    .catch(e => {
                       next(e)
                    })
                       
                break;   
            default:
                next();
        }
    }
    return middleware
}