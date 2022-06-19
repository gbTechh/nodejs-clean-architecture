const express = require('express');
const { asyncWrapper } = require('@dimosbotsaris/express-async-handler');
const {

  validateCreateUserBody,
} = require('../../middleware/endpointValidator');
const {
  toResponseModel,
} = require('../users/mapper');
const response = require('../../../common/errors/response')

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init({ authService }) {

  router.post('/register', validateCreateUserBody(), asyncWrapper(registerUser));

  async function registerUser(req, res){

    const result = await authService.register({
      name: req.body.name,
      lastname: req.body.lastname,
      phone: req.body.phone,
      address: req.body.address,
      document: req.body.document,
      email: req.body.email,
      password: req.body.password,
      rolId: req.body.rolId,
    });
    return res.send({
      data: toResponseModel(result),
    });        
  }


  router.post('/login', asyncWrapper(login));

  async function login(req, res){
    const result = await authService.login({
      email: req.body.email,
      password: req.body.password
    });

    let data = {
      token: result.token,
      user:toResponseModel(result.user)

    }
    return response.success(res,data,202)
  }






  return router;
}

module.exports.init = init;


