function init({
  rolRepository,
  moduleRepository,
  rolHasModuleRepository
}) {

  async function createRol(body){
    const allModules = await moduleRepository.getAllModules()
    const data = await rolRepository.createRol(body);
    const rolId = data.id 

    let modulesId = [] 
    allModules.forEach(element => {
      modulesId.push({
        module_id: element.id,
        rol_id: rolId
      })
    });

    await rolHasModuleRepository.createRolHasModule(modulesId)

    

    return data
  }

  async function getAllRoles(options){
    return rolRepository.getAllRoles(options)
  }

  async function getRolById(options){
    return rolRepository.getRolById(options)
  }

  async function editRol(options){
    return rolRepository.editRol(options)
  }
  async function permissionRol(options){
    return rolHasModuleRepository.updatePermissionRol(options)
  }

  async function deleteRol(options){
  
    await rolHasModuleRepository.deleteRolHasModule(options)

    return await rolRepository.deleteRol(options)
  }

  return {
    createRol,
    getAllRoles,
    getRolById,
    editRol,
    permissionRol,
    deleteRol
  };
}

module.exports.init = init;
