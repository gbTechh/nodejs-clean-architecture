class Permission {
  constructor({
    id,
    module_id,
    rol_id,
    r,   
    w,
    d,
    u,
    createdAt,
    updatedAt
  } = {}) {
    this.id = id; 
    this.module_id = module_id; 
    this.rol_id = rol_id;     
    this.r = r;
    this.w = w;     
    this.d = d;     
    this.u = u;     
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Permission;
