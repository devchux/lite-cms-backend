const Member = require("../models/members.model");
const { update } = require("../models/users.model");
const User = require("../models/users.model");
const logger = require("../utils/logger");

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
        status: "failed",
        message: "Member already exist",
      });
    }
    User.create({ name, email, phoneNumber: phoneNumber.toString() })
      .then(async ({ id }) => {
        try {
          const newMember = await Member.create({ UserId: id, role, password });

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
            status: "failed",
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
      status: "failed",
      message: "An error occured",
    });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Member });

    return res.status(200).json({
      status: "success",
      message: "Here are the list of members",
      users,
    });
  } catch (error) {
    logger.error(`(getAllMembers) Users were not fetched: ${error.message}`);
    return res.status(500).json({
      status: "failed",
      message: "An error occured while fetching Users",
    });
  }
};

exports.updateMember = async (req, res) => {
  const { name, email, role, phoneNumber, password } = req.body;
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({
        status: "failed",
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
          const updateMember = await member.update({
            role: role || member.role,
            password: password || member.password,
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
            status: "failed",
            message: "User could not be updated",
          });
        }
      })
      .catch((error) => {
        logger.error(
          `(updateMember) User could not be updated: ${error.message}`
        );
        return res.status(500).json({
          status: "failed",
          message: "User could not be updated",
        });
      });
  } catch (error) {
    logger.error(`(updateMember) User could not be found: ${error.message}`);
    return res.status(500).json({
      status: "failed",
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
        status: "failed",
      });
    });
};
