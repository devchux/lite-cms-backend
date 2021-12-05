const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbDialect: process.env.DB_DIALECT,
  dbHost: process.env.DB_HOST,
  jwtToken: process.env.JWT_TOKEN,
};
