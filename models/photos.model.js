const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PhotoSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const Photo = sequelize.define("Photo", PhotoSchema, { timestamps: true });

module.exports = Photo;
