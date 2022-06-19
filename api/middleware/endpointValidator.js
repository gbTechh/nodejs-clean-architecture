/* eslint-disable no-underscore-dangle */
const passwordComplexity = require('joi-password-complexity');
const {
  body,
  param,
  validationResult,
} = require('express-validator');
const { errorHandler } = require('@dimosbotsaris/express-error-handler');

const error = require('../../common/errors/errorResponse')
const {
  PASSWORD_COMPLEXITY,
} = require('../../common/constants');


const requireValidUserBody = () => {
  let passwordErrorMsg;
  return [
    body('email')
      .exists()
      .isEmail()
      .withMessage({
        message: 'Asegurate de escribir un email correcto.',
        status: 400,
      }),
    body('name')
      .exists()
      .escape()
      .withMessage({
        message: 'Asegurate de escribir un nombre correcto.',
        status: 400,
      }),
    body('lastname')
      .exists()
      .escape()
      .withMessage({
        message: 'Asegurate de escribir un lastname correcto.',
        status: 400,
      }),
    body('document')
      .exists()
      .isNumeric()
      .withMessage({
        message: 'El documento solo puede llevar numeros.',
        status: 400,
      }),
    body('phone')
    .exists()
    .isNumeric()
    .withMessage({
      message: 'El telefono solo puede llevar numeros.',
      status: 400,
    }),
    body('address')
    .exists()
    .escape()
    .withMessage({
      message: 'Asegúrate de escribir una dirección correcta',
      status: 400,
    }),
    body('rolId')
    .exists()
    .isNumeric()
    .withMessage({
      message: 'asegurate de escribir un rolId correcto',
      status: 400,
    }),
    body('password')
      .exists()
      .withMessage({
        message: 'Asegúrate de escribir una password correcta',
        status: 400,
      })
      .custom((value) => {
        const passwordChecking = passwordComplexity(PASSWORD_COMPLEXITY, 'Password').validate(value);
        passwordErrorMsg = passwordChecking && passwordChecking.error && passwordChecking.error.details && Array.isArray(passwordChecking.error.details)
          ? passwordChecking.error.details[0].message
          : null;
        if (passwordErrorMsg) {
          return false;
        }
        return true;
      })
      .withMessage(() => ({
        message: passwordErrorMsg,
        status: 400,
      })),
  ];
};

const requireValidModuleBody = () => {

  return [
    body('name')
      .exists()     
      .withMessage({
        message: 'Asegurate de escribir un nombre correcto.',
        status: 400,
      }),
    body('description')
      .exists()
      .escape()
      .withMessage({
        message: 'Asegurate de escribir una descripcion correcta.',
        status: 400,
      }),
    body('status')
      .exists()
      .isNumeric()
      .withMessage({
        message: 'Asegurate de escribir un status correcto.',
        status: 400,
      }),    
  ];
};

const requireValidRolBody = () => {

  return [
    body('name')
      .exists()     
      .withMessage({
        message: 'Asegurate de escribir un nombre correcto.',
        status: 400,
      }),
    body('description')
      .exists()
      .escape()
      .withMessage({
        message: 'Asegurate de escribir una descripcion correcta.',
        status: 400,
      }),
    body('status')
      .exists()
      .isNumeric()
      .withMessage({
        message: 'Asegurate de escribir un status correcto.',
        status: 400,
      }),    
  ];
};


const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const validationError = validationErrors.array({
    onlyFirstError: true,
  })[0];

  const errMsg = validationError?.msg?.message || 'Bad request';
  const errStatus = validationError?.msg?.status || 400;
  return errorHandler({ trace: true })(error(errMsg, errStatus),req, res, next);
};

const validateCreateUserBody = () => [
  requireValidUserBody(),
  validate,
];

const validateCreateModuleBody = () => [
  requireValidModuleBody(),
  validate,
];
const validateCreateRolBody = () => [
  requireValidRolBody(),
  validate,
];


module.exports = {
  validateCreateUserBody,
  validateCreateModuleBody,
  validateCreateRolBody,

};
