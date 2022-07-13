const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BookSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}

const Book = sequelize.define('Book', BookSchema, { timestamps: true });

module.exports = Book