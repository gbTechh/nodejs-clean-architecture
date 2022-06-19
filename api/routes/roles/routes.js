
const express = require('express');
const {asyncWrapper} = require('@dimosbotsaris/express-async-handler');
const response = require('../../../common/errors/response')
const {
  toResponseModel,
} = require('./mapper');

const {
  validateCreateRolBody
} = require('../../middleware/endpointValidator');
const modulesRoute = require('../modules/routes')

const check = require('../../middleware/checkAuth')


// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: false });

function init(services) {

  const { rolService, moduleService, permissionService } = services;
  router.get('/:rolId', asyncWrapper(getRolById) );
  router.get('/',[
    check('auth'),    
    check('isAdmin',services)
    ]
    ,asyncWrapper(getRoles) );
  router.post('/',validateCreateRolBody(),asyncWrapper(createRol))
  router.put('/:rolId',asyncWrapper(editRol))
  router.patch('/:rolId/permission',asyncWrapper(permissionRol))
  router.delete('/:rolId',asyncWrapper(deleteRol))
 

  async function getRolById(req, res){
    const result = await rolService.getRolById({
      rolId: req.params.rolId,
    });
    
    return response.success(res,toResponseModel(result), 202) 
  }

  async function getRoles(req, res){
  
    const result = await rolService.getAllRoles({
      userEmail: req.params.userEmail,
    });
    let dataResult = result.map(res => toResponseModel(res) )
    return response.success(res,dataResult, 200)  
   
    
  }

  async function createRol(req, res){
    const result = await rolService.createRol({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    });
    return response.success(res,toResponseModel(result), 202)   
  }

  async function editRol(req, res){
    const result = await rolService.editRol({
      rolId: req.params.rolId,
      body:{
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
      }
    })

    return response.success(res,toResponseModel(result), 202) 
  }

  async function permissionRol(req, res){
    const result = await rolService.permissionRol({
      rolId: req.params.rolId,
      body:req.body
    })

    return response.success(res,toResponseModel(result), 202) 
  }

  async function deleteRol(req, res){
    const result = await rolService.deleteRol({
      rolId: req.params.rolId,
      force: false
    })

    return response.success(res,toResponseModel(result),202)
  }


  router.post('/',validateCreateRolBody(), modulesRoute.init({
    moduleService,
  }))

 

  return router;
}

module.exports.init = init;


