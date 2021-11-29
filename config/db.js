const { Sequelize } = require("sequelize");
const logger = require("../utils/logger");
const { dbName, dbUsername } = require("./constants");

const sequelize = new Sequelize(dbName, dbUsername, "", {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
