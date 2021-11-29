const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");

const VolunteerSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

const Volunteer = sequelize.define("Volunteer", VolunteerSchema, {
  timestamps: true,
});

module.exports = Volunteer;
