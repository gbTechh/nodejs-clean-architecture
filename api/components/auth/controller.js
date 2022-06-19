const bcrypt = require('bcrypt')

const authService = require('../../../services/auth')

const TABLA = 'auth';

module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    store = require('../../../store/dummy');

  }
  
  async function upsert(data){
    const authData = {
      id: data.id,
    }

    if(data.username){
      authData.username = data.username;
    }

    if(data.password){    
      authData.password = await bcrypt.hash(data.password.toString(), 8) ;   
    }

    return store.upsert(TABLA, authData)
  }

  async function login(username, password){

    const data = await store.query(TABLA, { username });
    console.log({password})
    console.log({password2:data.password})
    return bcrypt.compare(password, data.password)
      .then(sonIguales => {
        if(sonIguales){
          //generar token
          console.log(authService.sign(data))
          console.log(data)
          return authService.sign(data)
        }else{
          throw new Error('Información inválida')
        }
      }).catch(e => console.log(e))
    
    
  }

  return {
    upsert,
    login
  }

}