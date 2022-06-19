const {
  PORT,
  BD,
} = require('./config');
const dbContainer = require('./data/infraestructure/db');
const signals = require('./signals');
const appContainer = require('./api');





const usersServiceContainer = require('./domain/users/service');
const moduleServiceContainer = require('./domain/modules/service');
const rolServiceContainer = require('./domain/rol/service');
const permissionServiceContainer = require('./domain/permission/service');
const authServiceContainer = require('./domain/auth/service')



const usersRepositoryContainer = require('./data/repositories/users');
const moduleRepositoryContainer = require('./data/repositories/modules');
const rolRepositoryContainer = require('./data/repositories/rol');
const rolHasModuleRepositoryContainer = require('./data/repositories/rol_has_module');
const tableRepositoryContainer = require('./data/repositories/table');
const authRepositoryContainer = require('./data/repositories/auth')




const db = dbContainer.init(BD);

const authRepository = authRepositoryContainer.init(db.models());
const usersRepository = usersRepositoryContainer.init(db.models());
const moduleRepository = moduleRepositoryContainer.init(db.connection(), db.models());
const rolRepository = rolRepositoryContainer.init(db.models());
const tableRepository = tableRepositoryContainer.init(db.models());
const rolHasModuleRepository = rolHasModuleRepositoryContainer.init(db.models());


const usersService = usersServiceContainer.init({
  usersRepository,
});
const moduleService = moduleServiceContainer.init({
  moduleRepository,
  rolHasModuleRepository,
  rolRepository,
  tableRepository
});
const rolService = rolServiceContainer.init({
  rolRepository,
  moduleRepository,
  rolHasModuleRepository
});
const permissionService = permissionServiceContainer.init({
  rolRepository,
  moduleRepository,
  rolHasModuleRepository,
  usersRepository,
  tableRepository
  
});
const authService = authServiceContainer.init({
  authRepository,
  usersRepository
});

const app = appContainer.init({
  authService,
  usersService,
  moduleService,
  rolService,
  permissionService

});




let server = app.listen(PORT, () => {
  console.log(`Listening on | PORT:${PORT} |`);
});


const shutdown = signals.init(async () => {
  await db.close();
  await server.close();
});


(async () => {
  try {
    db.models()
    await db.connection().authenticate({ force: true });
  } catch (error) {
    console.log({error})
    await shutdown();
  }
})();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


