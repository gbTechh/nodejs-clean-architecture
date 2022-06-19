const response = require('../../common/errors/errorResponse');
const auth = require('../../data/repositories/auth');


function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  try {
    const token = auth.init().getToken(authorization);
    const decoded = auth.init().verifyTokenSync(token)
  
    req.user = decoded
  
    return decoded
  } catch (error) {
    throw response(error, 403)   
  }
 
}

module.exports ={
  decodeHeader
}