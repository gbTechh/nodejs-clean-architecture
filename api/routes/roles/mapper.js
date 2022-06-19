const RolesResponse = require('./responses');

const toResponseModel = function toResponseModel(userDoc) {
 
  return new RolesResponse({ ...userDoc });
};

module.exports = {
  toResponseModel,
};
