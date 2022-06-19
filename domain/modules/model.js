class Module {
  constructor({
    id,
    name,
    description,
    status,   
    tableId,
    createdAt,
    updatedAt
  } = {}) {
    this.id = id; 
    this.name = name; 
    this.description = description;     
    this.tableId = tableId;
    this.status = status;     
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Module;
