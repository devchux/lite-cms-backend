const express = require("express");
const routes = require('./routes')
const sequelize = require("./config/db")
const logger = require('./utils/logger');

const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    logger.info('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    logger.error(`Unable to connect to the database: ${error.message}`);
    throw error
  }
})()

sequelize.sync().catch((error) => {
  logger.error(`Database could not be synchronized: ${error.message}`);
  throw error;
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);



const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App running on port ${port}`));