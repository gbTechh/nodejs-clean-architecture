function init({
  usersRepository,
}) {
  async function getUser(options) {   
    const [ user ] = await Promise.all([
      usersRepository.getUser(options),
    ]);
 
    return {
      user,    
    };
  }

  async function getAllUsers(){
    return usersRepository.getAllUsers()
  }


  async function editUser(options, body){
    return usersRepository.editUser(options, body)
  }

  async function deleteUser(options){
    return usersRepository.deleteUser(options)
  }

  return {
    getAllUsers,
    getUser,
    editUser,
    deleteUser
  };
}

module.exports.init = init;
