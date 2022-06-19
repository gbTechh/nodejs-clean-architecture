const express = require('express');
const {asyncWrapper} = require('@dimosbotsaris/express-async-handler');
const response = require('../../../common/errors/response')
const {
  toResponseModel,
} = require('./mapper');
const check = require('../../middleware/checkAuth')

const code = 'user';


const router = express.Router({ mergeParams: false });

function init(services) {

  const { usersService } = services;

  router.get('/',[
    check('permissionRead',services, code)
  ] ,asyncWrapper(getUsers));

  router.get('/:userId/id',[
    check('permissionRead',services, code)
  ], asyncWrapper(getUserById));

  router.get('/:userEmail/email',[
    check('permissionRead',services, code)
  ], asyncWrapper(getUserByEmail));

  router.put('/:userId',[
    check('permissionRead',services, code)
  ],asyncWrapper(editUser))

  router.delete('/:userId',[
    check('permissionRead',services, code)
  ],asyncWrapper(deleteUser))

  router.delete('/:userId/permant',[
    check('permissionRead',services, code)
  ],asyncWrapper(deleteUser))


  async function getUsers(req, res){
    const result = await usersService.getAllUsers()
    let dataResult = result.map(res => toResponseModel(res) )
    return response.success(res,dataResult, 200) 
  }

  async function getUserById(req, res){

    const result = await usersService.getUser({
      userId: req.params.userId,
    });
    
    return response.success(res,toResponseModel(result.user), 200) 
  }
  async function getUserByEmail(req, res){

    const result = await usersService.getUser({
      userEmail: req.params.userEmail,
    });
    
    return response.success(res,toResponseModel(result.user), 200) 
  }

  async function editUser(req, res){
    const result = await usersService.editUser({
      userId: req.params.userId,
      body:{
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        document: req.body.document,
        email: req.body.email,
        rolId: req.body.rolId,
      }
    })

    return response.success(res,toResponseModel(result), 202) 
  }

  async function deleteUser(req, res){
    const result = await usersService.deleteUser({
      userId: req.params.userId,
      force: false
    })

    return response.success(res,toResponseModel(result),202)
  }




  return router;
}

module.exports.init = init;


