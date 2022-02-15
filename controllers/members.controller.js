const Member = require("../models/members.model");
const User = require("../models/users.model");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/constants");
const { getPagingData, getPagination } = require("../utils/pagination");

exports.createMembers = async (req, res) => {
  const { name, email, role, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const member = await Member.findOne({
      where: { UserId: user.id },
    });
    if (member) {
      logger.error(`(createMembers) Member already exist: ${user.id}`);
      return res.status(403).json({
        status: "error",
        message: "Member already exist",
      });
    }
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newMember = await Member.create({
        name,
        UserId: user.id,
        role,
        password: hashPassword,
      });
      const getMember = await Member.findByPk(newMember.id, { include: User });
      return res.status(201).json({
        user: getMember,
        status: "success",
        message: "Member has been created",
      });
    } catch (error) {
      logger.error(`(createMember) User was not created: ${error.message}`);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else {
    try {
      const newUser = await User.create({
        email,
      });
      const hashPassword = await bcrypt.hash(password, 10);
      const newMember = await Member.create(
        {
          name,
          UserId: newUser.id,
          role,
          password: hashPassword,
        },
        { include: [User] }
      );
      const getMember = await Member.findByPk(newMember.id, { include: User });
      return res.status(201).json({
        user: getMember,
        status: "success",
        message: "Member has been created",
      });
    } catch (error) {
      logger.error(`(createMember) User was not created: ${error.message}`);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
};

exports.getAllMembers = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const users = await Member.findAndCountAll({
      include: User,
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    });

    const data = getPagingData(users, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Here are the list of members",
      users: data,
    });
  } catch (error) {
    logger.error(`(getAllMembers) Users were not fetched: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: error.message,
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
      message: error.message,
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
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
      })
      .then(async () => {
        try {
          const hashPassword = await bcrypt.hash(password, 10);
          const updateMember = await member.update({
            name: name || member.name,
            role: role || member.role,
            password: hashPassword || member.password,
          });
          try {
            const getMember = await Member.findOne({
              where: { id: updateMember.id },
              include: User,
            });
            return res.status(200).json({
              status: "success",
              message: "User has been updated",
              user: getMember,
            });
          } catch (error) {
            return res.status(500).json({
              status: "error",
              message: error.message,
            });
          }
        } catch (error) {
          logger.error(
            `(updateMember) Member could not be updated: ${error.message}`
          );
          return res.status(500).json({
            status: "error",
            message: error.message,
          });
        }
      })
      .catch((error) => {
        logger.error(
          `(updateMember) User could not be updated: ${error.message}`
        );
        return res.status(500).json({
          status: "error",
          message: error.message,
        });
      });
  } catch (error) {
    logger.error(`(updateMember) User could not be found: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: error.message,
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
        message: error.message,
        status: "error",
      });
    });
};

exports.deleteBulkMembers = async (req, res) => {
  Member.destroy({
    where: {
      id: req.body.ids,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Members have been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteBulkMembers) Members could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
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
        expiresIn: "24h",
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
      message: error.message,
      status: "error",
    });
  }
};
