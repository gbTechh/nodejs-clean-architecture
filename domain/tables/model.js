class Table {
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

module.exports = Table;
