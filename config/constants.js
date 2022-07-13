const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbDialect: process.env.DB_DIALECT,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  jwtToken: process.env.JWT_TOKEN,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryAPICloudName: process.env.CLOUDINARY_API_CLOUD_NAME,
};
