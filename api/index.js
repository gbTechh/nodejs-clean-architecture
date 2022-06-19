const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');


const app = express();
app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');
const errors = require('../common/errors');

const userRoutes = require('./routes/users/routes');
const authRoutes = require('./routes/auth/routes');
const modulesRoutes = require('./routes/modules/routes');
const rolRoutes = require('./routes/roles/routes');

//ROUTER


module.exports.init = (services) => {
  
  
  app.use('/api/user', userRoutes.init(services));
  app.use('/api/auth', authRoutes.init(services));
  app.use('/api/module', modulesRoutes.init(services));
  app.use('/api/rol', rolRoutes.init(services));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


  app.use(errors);
  const httpServer = http.createServer(app);
  return httpServer;
}