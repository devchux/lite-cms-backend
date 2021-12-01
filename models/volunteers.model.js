const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const User = require("./users.model");

const VolunteerSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
};

const Volunteer = sequelize.define("Volunteer", VolunteerSchema, {
  timestamps: true,
});

User.hasOne(Volunteer, {
  onDelete: "CASCADE",
});
Volunteer.belongsTo(User);

module.exports = Volunteer;
