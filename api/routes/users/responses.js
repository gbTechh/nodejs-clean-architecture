/**
  * This is the user response.
  * Added in order to avoid return password as response.
  * Password is property of our business model in domain layer.
*/
class UserResponse {
  constructor({
    id,
    fullName,
    username,
    document,
    address,
    phone,
    email,
    rolId,
    createdAt,
    updatedAt,
    
 
  } = {}) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.document = document;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.rolId = rolId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = UserResponse;
