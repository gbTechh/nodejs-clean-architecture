const Sequelize = require('sequelize');

const { BD_HOST, BD_USERNAME, BD_PASSWORD, BD_NAME} = require('.');


const SequelizeDb = () => {
    return new Sequelize(BD_NAME, BD_USERNAME, BD_PASSWORD, {
        host: BD_HOST,
        dialect: 'mysql',
        define:{
            timestamps: true,
            freezeTableName: true,
            underscored: true
        }
    })
}



module.exports = SequelizeDb;