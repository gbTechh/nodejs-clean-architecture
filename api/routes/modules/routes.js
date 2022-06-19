const express = require('express');
const {asyncWrapper} = require('@dimosbotsaris/express-async-handler');
const response = require('../../../common/errors/response')
const {
  toResponseModel,
  toResponseModelTable
} = require('./mapper');

const {
  validateCreateModuleBody,
} = require('../../middleware/endpointValidator');
const check = require('../../middleware/checkAuth')

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init(services) {

  const { moduleService } = services;

  router.get('/tables', asyncWrapper(getTables));
  router.get('/:moduleId/id', [
    check('auth'),
    check('isAdmin', services),
  ],asyncWrapper(getModulesById) );
  router.get('/', asyncWrapper(getModules) );
  router.post('/',validateCreateModuleBody(),asyncWrapper(createModule))
  router.put('/:moduleId',asyncWrapper(editModule))
  router.delete('/:moduleId',asyncWrapper(deleteModule))
 

  async function createModule(req, res){
    const result = await moduleService.createModule({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
    });
    return response.success(res,toResponseModel(result), 202)   
  }

  async function getModulesById(req, res){

    const result = await moduleService.getModuleById({
      moduleId: req.params.moduleId,
    });
    
    return response.success(res,toResponseModel(result), 202) 
  }

  async function getModules(req, res){
    const result = await moduleService.getAllModules();
    let dataResult = result.map(res => toResponseModel(res) )
    return response.success(res,dataResult, 200)  
  }

  async function getTables(req, res){

    const result = await moduleService.getAllTables();
    let dataResult = result.filter(e => e.isModule === true)
    return response.success(res,dataResult, 200)  
  }

  async function editModule(req, res){
    const result = await moduleService.editModule({
      moduleId: req.params.moduleId,
      body:{
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
      }
    })

    return response.success(res,toResponseModel(result), 202) 
  }

  async function deleteModule(req, res){
    const result = await moduleService.deleteModule({
      moduleId: req.params.moduleId,
      force: false
    })

    return response.success(res,toResponseModel(result),202)
  }




  return router;
}

module.exports.init = init;


