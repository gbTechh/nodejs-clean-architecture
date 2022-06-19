/**
  * This is the user response.
  * Added in order to avoid return password as response.
  * Password is property of our business model in domain layer.
*/
class TablesResponse {
  constructor({
    id,
    name_table,
    isModule,
    code,   
    createdAt,
    updatedAt
  } = {}) {
    this.id = id; 
    this.name_table = name_table;
    this.isModule = isModule;
    this.code = code;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = TablesResponse;
