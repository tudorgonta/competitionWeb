const Sequelize = require('sequelize');


const dotenv = require('dotenv');
dotenv.config();

const dbName = process.env.DATABASE_NAME.toString();
const dbUser = process.env.DATABASE_USER.toString();
const dbPassword = process.env.DATABASE_PASSWORD.toString();

const sequelize = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword, 
    {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false,
    }
);

module.exports = sequelize;