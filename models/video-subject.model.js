const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");

const SubjectSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

const VideoSubject = sequelize.define('VideoSubject', SubjectSchema, { timestamps: true });

module.exports = VideoSubject;