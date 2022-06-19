/**
  * This is the user response.
  * Added in order to avoid return password as response.
  * Password is property of our business model in domain layer.
*/
class RolesResponse {
  constructor({
    id,
    name,
    description,
    status,
    createdAt,
    updatedAt,
    
 
  } = {}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;    
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = RolesResponse;
