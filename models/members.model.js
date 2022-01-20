const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./users.model");

const MemberSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "member",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

const Member = sequelize.define("Member", MemberSchema, { timestamps: true });

User.hasOne(Member, {
  onDelete: "CASCADE",
});
Member.belongsTo(User);

module.exports = Member;
