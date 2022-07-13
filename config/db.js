const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");
const { dbName, dbUsername, dbHost, dbDialect, dbPassword } = require("./constants");

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = sequelize;
