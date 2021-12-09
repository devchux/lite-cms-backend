const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");
const Subject = require("./subjects.model");

const AudioSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  audioUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}

const Audio = sequelize.define('Audio', AudioSchema, { timestamps: true });

Member.hasMany(Audio);
Audio.belongsTo(Member)

Subject.hasMany(Audio, {
  onDelete: "CASCADE",
});
Audio.belongsTo(Subject);

module.exports = Audio;