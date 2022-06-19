if(process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const config ={
  PORT: process.env.PORT,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  BD: {
    BD_NAME: process.env.BD_NAME,
    BD_USERNAME: process.env.BD_USERNAME,
    BD_PASSWORD: process.env.BD_PASSWORD,
    BD_HOST: process.env.BD_HOST,
  },  
  SECRET: process.env.SECRET,
  KEY: process.env.KEY,
}

module.exports = config;