const ModulesResponse = require('./responses');
const TablesResponse = require('./responseTable');

const toResponseModel = function toResponseModel(userDoc) {
 
  return new ModulesResponse({ ...userDoc });
};

const toResponseModelTable = function toResponseModel(userDoc) {
 
  return new TablesResponse({ ...userDoc });
};


module.exports = {
  toResponseModel,
  toResponseModelTable
};
