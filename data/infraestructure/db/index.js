/*
  It can be published as private npm module shared among all team's projects.
*/
const { Sequelize, DataTypes } = require('sequelize');
const modelsCreate = require('./models')

module.exports.init = (BD) => {

  if (!BD) {
    throw new Error('add correct format of config with dbConnectionString');
  }
  
  const { BD_NAME, BD_USERNAME, BD_PASSWORD } = BD

  const options = {
    host: BD.BD_HOST,    
    dialect:'mysql',
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    }, 
    define: {
      underscored: false,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
    },
  }
 
   
 
  function handleConnection(){
    // Check for errors on connecting to MYSQL

    return new Sequelize(BD_NAME,BD_USERNAME,BD_PASSWORD, options);
  

  
    // connection.connect((err) => {
    //   if(err){
    //     console.log('[db err]', err);
    //     setTimeout(handleConnection, 2000);
    //   }else{
    //     console.log('DB Connected!')
    //   }
     
    // })
  
    // connection.on('error', err => {
    //   console.log('[db err]', err);
  
    //   if(err.code === 'PROTOCOL_CONNECTION_LOST'){
    //     handleConnection();
    //   }else{
    //     throw err
    //   }
    // })
  
  }  



  return {
    connection() {
      return handleConnection()
    },
    models(){    
      return modelsCreate.init(this.connection(),DataTypes)
    },    
    close(){
      return handleConnection().close()
    }
  };
};


