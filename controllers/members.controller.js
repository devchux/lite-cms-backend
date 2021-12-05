const Member = require("../models/members.model");
const User = require("../models/users.model");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/constants");

exports.createMembers = async (req, res) => {
  const { name, email, role, phoneNumber, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      logger.error(`(createMembers) Member already exist: ${user.id}`);
      return res.status(403).json({
        status: "error",
        message: "Member already exist",
      });
    }
    User.create({ name, email, phoneNumber: phoneNumber.toString() })
      .then(async ({ id }) => {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const newMember = await Member.create({
            UserId: id,
            role,
            password: hashPassword,
          });

          return res.status(201).json({
            user: newMember,
            status: "success",
            message: "Member has been created",
          });
        } catch (error) {
          logger.error(
            `(createMembers) Member could not be created: ${error.message}`
          );
          return res.status(500).json({
            status: "error",
            message: "An error occured",
          });
        }
      })
      .catch((error) => {
        logger.error(
          `(createMembers) User could not be created: ${error.message}`
        );
        throw error;
      });
  } catch (error) {
    logger.error(
      `(createMembers) User could not be searched for: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const users = await Member.findAll({ include: User });

    return res.status(200).json({
      status: "success",
      message: "Here are the list of members",
      users,
    });
  } catch (error) {
    logger.error(`(getAllMembers) Users were not fetched: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error occured while fetching Users",
    });
  }
};

exports.getSingleMember = async (req, res) => {
  try {
    const user = await Member.findOne({
      where: {
        id: req.params.id,
      },
      include: User,
    });

    return res.status(200).json({
      status: "success",
      message: "User has been fetched",
      user,
    });
  } catch (error) {
    logger.error(`(getSingleMember) User was not fetched: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error occured while fetching User",
    });
  }
};

exports.updateMember = async (req, res) => {
  const { name, email, role, phoneNumber, password } = req.body;
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({
        status: "error",
        message: "User was not found",
      });
    const user = await User.findOne({ where: { id: member.UserId } });
    user
      .update({
        name: name || user.name,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
      })
      .then(async () => {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const updateMember = await member.update({
            role: role || member.role,
            password: hashPassword || member.password,
          });
          return res.status(200).json({
            status: "success",
            message: "User has been updated",
            user: updateMember,
          });
        } catch (error) {
          logger.error(
            `(updateMember) Member could not be updated: ${error.message}`
          );
          return res.status(500).json({
            status: "error",
            message: "User could not be updated",
          });
        }
      })
      .catch((error) => {
        logger.error(
          `(updateMember) User could not be updated: ${error.message}`
        );
        return res.status(500).json({
          status: "error",
          message: "User could not be updated",
        });
      });
  } catch (error) {
    logger.error(`(updateMember) User could not be found: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error ocurred",
    });
  }
};

exports.deleteMember = async (req, res) => {
  Member.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Member has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteMember) Member could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Member was not deleted",
        status: "error",
      });
    });
};

exports.loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({
        status: "error",
        message: "Email or Password is not correct",
      });
    const member = await Member.findOne({
      where: {
        UserId: user.id,
      },
    });
    if (!member)
      return res.status(404).json({
        status: "error",
        message: "Email or Password is not correct",
      });
    const comparePassword = await bcrypt.compare(password, member.password);
    if (!comparePassword)
      return res.status(401).json({
        status: "error",
        message: "Email or Password is not correct",
      });
    const token = jwt.sign(
      { userId: member.id, email, role: member.role },
      jwtToken,
      {
        expiresIn: "2h",
      }
    );
    return res.status(200).json({
      status: "success",
      message: "You are now logged in",
      member: { ...member, token },
    });
  } catch (error) {
    logger.error(
      `(loginMember) Member could not be logged in: ${error.message}`
    );
    return res.status(500).json({
      message: "Member was not logged in",
      status: "error",
    });
  }
};
