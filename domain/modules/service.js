function init({
  rolRepository,
  moduleRepository,
  rolHasModuleRepository,
  tableRepository
}) {

  async function createModule(body){
  
    const allRoles = await rolRepository.getAllRoles()
    const data = await moduleRepository.createModule(body);
    const moduleId = data.id 

    let rolesId = [] 
    allRoles.forEach(element => {
      rolesId.push({
        rol_id: element.id,
        module_id: moduleId
      })
    });

    await rolHasModuleRepository.createRolHasModule(rolesId)

    return data
  }
  
  async function getAllTables(){
    return tableRepository.getAllTables();
  }

  async function getModuleJoinTable(code){
    return moduleRepository.getModuleJoinTable(code);
  }
  async function getAllModules(){
    return moduleRepository.getAllModules();
  }

  async function getModuleById(options){
    return moduleRepository.getModuleById(options)
  }

  async function editModule(options, body){
    return moduleRepository.editModule(options, body)
  }

  async function deleteModule(options){

    await rolHasModuleRepository.deleteRolHasModuleInModule(options)
  
    return await moduleRepository.deleteModule(options)
  }

  return {
    createModule,
    getAllModules,
    getAllTables,
    getModuleJoinTable,
    getModuleById,
    editModule,
    deleteModule
  };
}

module.exports.init = init;
