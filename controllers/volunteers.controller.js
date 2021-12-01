const User = require("../models/users.model");
const Volunteer = require("../models/volunteers.model");
const logger = require("../utils/logger");

exports.createVolunteers = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  User.create({ name, phoneNumber, email })
    .then(async ({ id }) => {
      try {
        const newVolunteer = await Volunteer.create({ UserId: id, message });
        logger.info(`Volunteer ${newVolunteer.id} has been created`);

        return res.status(201).json({
          volunter: newVolunteer,
          message: "You are now a volunteer",
          status: "success",
        });
      } catch (error) {
        logger.error(
          `(createVolunteers) Volunteer was not registered: ${error.message}`
        );
        return res.status(500).json({
          message: "An error occured",
          status: "failed",
        });
      }
    })
    .catch((error) => {
      logger.error(
        `(createVolunteers) User could not be created: ${error.message}`
      );
      res.status(500).json({
        status: "failed",
        message: "An error ocurred",
      });
    });
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll({ include: User });
    logger.info("Volunteers have been fetched successfully");

    return res.status(200).json({
      volunteers,
      message: "Here are the list of volunteers",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(getAllVolunteers) List of volunteers could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occured",
      status: "failed",
    });
  }
};

exports.deleteVolunteer = async (req, res) => {
  Volunteer.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Volunteer has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteVolunteer) Volunteer could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Volunteer was not deleted",
        status: "failed",
      });
    });
};

exports.updateVolunteer = async (req, res) => {
  const volunteer = await Volunteer.findByPk(req.params.id);
  if (!volunteer)
    return res.status(404).json({
      status: "failed",
      message: "Volunteer was not found",
    });
  const { name, email, phoneNumber, message } = req.body;
  const user = await User.findOne({ where: { phoneNumber } });
  user
    .update({
      name: name || user.name,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber,
    })
    .then(async () => {
      try {
        const updatedVolunteer = await volunteer.update({
          message: message || volunteer.message,
        });
        logger.info(`Volunteer ${updatedVolunteer.id} has been updated`);

        return res.status(200).json({
          volunteer: updatedVolunteer,
          message: "Volunteer has been updated",
          status: "success",
        });
      } catch (error) {
        logger.error(
          `(updateVolunteer) Volunteer ${volunteer.id} could not be updated: ${error.message}`
        );
        return res.status(500).json({
          message: "Volunteer was not updated",
          status: "failed",
        });
      }
    })
    .catch((error) => {
      logger.error(
        `(updateVolunteer) User ${user.id} could not be updated: ${error.message}`
      );
      return res.status(500).json({
        message: "Volunteer was not updated",
        status: "failed",
      });
    });
};
