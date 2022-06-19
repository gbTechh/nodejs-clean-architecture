class User {
  constructor({
    id,
    name,
    lastname,
    document,
    phone,
    address,
    rolId,
    token,
    email,
    password,
    createdAt,
    updatedAt
  } = {}) {
    this.id = id;
    this.fullName = `${name} ${lastname}`;
    this.document = document;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.token = token;
    this.rolId = rolId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
