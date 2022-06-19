function init({
  rolRepository,
  moduleRepository,
  rolHasModuleRepository
}) {

  async function getPermissionByModule(id){
    return rolHasModuleRepository.getPermissionByModule(id)
  }

  async function permissionRead({idModule, idRol}){
    const permissions = await getPermissionByModule(idModule);
    const result = permissions.filter(rol => rol.rol_id.toString() === idRol.toString())

    return result[0].r;
      
  }

 

  return {
    getPermissionByModule,
    permissionRead
    
  };
}

module.exports.init = init;
