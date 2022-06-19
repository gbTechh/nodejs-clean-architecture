const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config')
const error = require('../../utils/error')


function sign(data){
  return jwt.sign(data, SECRET);
}

const check = {
  own: function(req, owner){
    const decoded = decodeHeader(req);
    console.log(decoded);

    //comporbar si es o no propio
    if(decoded.id !== owner){
      throw error('No peudes hacer esto', 401)
    }

  }
}

function verify(token){
  return jwt.verify(token, SECRET)
}

function getToken(auth){
  if(!auth){
    throw error('No viene token', 404);
  }

  if(auth.indexOf('Bearer ') == -1){
    throw error('Formato invalido')
  }
  let token = auth.replace('Bearer ', '');
  return token
}

function decodeHeader(req){
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  console.log({token})
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}


module.exports = {
  sign,
  check
}