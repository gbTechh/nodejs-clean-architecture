if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}


module.exports = {
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  host:     process.env.BD_HOST,
  dialect:  "mysql",
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'migrations',
  define:{
    timestamps: true,
    freezeTableName: true,
    underscored: true
  }
}

