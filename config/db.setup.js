
const dbConfig = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Siemens123$",
    DB: "arsms",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

const Sequelize = require("sequelize");
const sequelizeDB = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
  
const db = {};
db.SequelizeType = Sequelize;
db.sequelizeDB = sequelizeDB;
const userModel = require("./../features/Users/user.model");
const accessModel = require("./../features/Access/access.model");
const unAuthorisedModel = require("./../features/Unauthorised-Access-list/unauthorised.model");
db.userDAO = userModel(sequelizeDB, Sequelize);
db.accessDAO = accessModel(sequelizeDB, Sequelize);
db.unAuthorisedDAO = unAuthorisedModel(sequelizeDB, Sequelize);
module.exports = db;
