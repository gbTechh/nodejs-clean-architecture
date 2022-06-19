const response = require('./response.js');

function errors(err, req,res,next){
  console.log('[error]', err);


  let message = err.message || 'Error interno';
  let status = err.status || 500;

  if(err.name === 'SequelizeUniqueConstraintError'){
    message = err.parent.sqlMessage;
    status = 409
  }


  response.error(req,res,message,status);
}

module.exports = errors;