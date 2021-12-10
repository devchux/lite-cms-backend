const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");
const VideoSubject = require("./video-subject.model");

const VideoSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
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

const Video = sequelize.define('Video', VideoSchema, { timestamps: true });

Member.hasMany(Video);
Video.belongsTo(Member)

VideoSubject.hasMany(Video, {
  onDelete: "CASCADE",
});
Video.belongsTo(VideoSubject)

module.exports = Video;