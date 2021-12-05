const { DataTypes } = require("sequelize/dist");
const sequelize = require("../config/db");
const Member = require("./members.model");

const ArticleSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

const Article = sequelize.define("Article", ArticleSchema, {
  timestamps: true,
});

Member.hasMany(Article, {
  onDelete: 'CASCADE'
});
Article.belongsTo(Member);

module.exports = Article;
