// DOMAIN LAYER
// Has the userRepository as a dependency. The authService does not know
// nor does it care where the user models came from. This is abstracted away
// by the implementation of the repositories. It just calls the needed repositories
// gets the results and usually applies some business logic on them.

const response = require("../../common/errors/errorResponse");


function init({
  authRepository,
  usersRepository,
}) {


  async function register(body) {
    return usersRepository.createUser(body);
  }

  async function login({email, password}){
    const user = await usersRepository.getUser({userEmail:email,password})
    const isPasswordCorrect = await authRepository.comparePassword(password, user.password)
      .catch((err) => {
        console.error(`Error en la autenticacion del usuario con el email: ${email}`, err);
        throw response('Credenciales no coindicen', 403)
      });
    if(!isPasswordCorrect){
      console.log('ERRORRRROROROROROR')
      return isPasswordCorrect
    }

    const token = await authRepository.createUserToken(user);
   
    return {
      token,
      user
    }
 
  }
  


  return {
    register,
    login
 
  };
}

module.exports.init = init;
