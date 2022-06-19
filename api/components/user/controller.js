const { v4: uuidv4 } = require('uuid');
const auth = require('../auth')

const TABLA = 'user';


module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    store = require('../../../store/dummy');

  }
  
  function list(){
    return store.list(TABLA);
  }

  function get(id){
    return store.get(TABLA, id);
  }

  async function upsert(body){
    console.log(body)
    const user = {
      name: body.name,
      username:body.username
    }

    if(body.id){
      user.id = body.id;
    }else{
      user.id = uuidv4();
    }

    if(body.password || body.username){
      await auth.upsert({
        id: user.id,
        username:user.username,
        password:body.password,

      })
    }

    return store.upsert(TABLA, user)
  }



  return {
    list,
    get,
    upsert
  }
}