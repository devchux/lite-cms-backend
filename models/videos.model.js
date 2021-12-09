const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");
const Subject = require("./subjects.model");

const VideoSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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

Subject.hasMany(Video, {
  onDelete: "CASCADE",
});
Video.belongsTo(Subject)

module.exports = Video;