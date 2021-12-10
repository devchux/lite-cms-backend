const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");
const AudioSubject = require("./audio-subject.model");

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
  slug: {
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

AudioSubject.hasMany(Audio, {
  onDelete: "CASCADE",
});
Audio.belongsTo(AudioSubject);

module.exports = Audio;