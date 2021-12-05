const User = require("../models/users.model");
const Volunteer = require("../models/volunteers.model");
const logger = require("../utils/logger");

exports.createVolunteers = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  const user = await User.findOne({
    where: {
      phoneNumber,
    },
  });
  if (user) {
    const newVolunteer = await Volunteer.create({ UserId: user.id, message });
    return res.status(201).json({
      volunter: newVolunteer,
      message: "You are now a volunteer",
      status: "success",
    });
  }
  User.create({ name, phoneNumber: phoneNumber.toString(), email })
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
          status: "error",
        });
      }
    })
    .catch((error) => {
      logger.error(
        `(createVolunteers) User could not be created: ${error.message}`
      );
      res.status(500).json({
        status: "error",
        message: "An error ocurred",
      });
      throw error;
    });
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll({ include: User });

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
      status: "error",
    });
  }
};

exports.getSingleVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({
      include: User,
      where: { id: req.params.id },
    });

    return res.status(200).json({
      volunteer,
      message: "Volunteer has been fetched",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(getSingleVolunteer) Volunteer could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occured while fetching volunteer",
      status: "error",
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
        status: "error",
      });
    });
};

exports.updateVolunteer = async (req, res) => {
  const volunteer = await Volunteer.findByPk(req.params.id);
  if (!volunteer)
    return res.status(404).json({
      status: "error",
      message: "Volunteer was not found",
    });
  const { name, email, phoneNumber, message } = req.body;
  const user = await User.findByPk(volunteer.UserId);
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
          status: "error",
        });
      }
    })
    .catch((error) => {
      logger.error(
        `(updateVolunteer) User ${user.id} could not be updated: ${error.message}`
      );
      return res.status(500).json({
        message: "Volunteer was not updated",
        status: "error",
      });
    });
};
