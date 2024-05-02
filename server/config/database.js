const Sequelize = require('sequelize');


const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.ENV.DATABSASE_NAME, 
    process.ENV.DATABASE_USER, 
    process.ENV.DATABASE_PASSWORD, 
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    }
);

module.exports = sequelize;