const Volunteer = require("../models/volunteers.model");
const logger = require("../utils/logger");

exports.createVolunteers = async (req, res) => {
  const { name, email, message } = req.body;
  const volunteer = await Volunteer.findOne({ where: { email } });
  if (volunteer) {
    logger.error(`(createVolunteers) Volunteer already exist: ${volunteer.id}`);
    return res
      .status(403)
      .json({ status: "failed", messsage: "You are already a volunteer" });
  }
  try {
    const newVolunteer = await Volunteer.create({ name, email, message });
    logger.info(`Volunteer ${newVolunteer.name} has been created`);

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
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.findAll();
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
  const { name, email, message } = req.body;
  try {
    const updatedVolunteer = await volunteer.update({
      name: name || volunteer.name,
      email: email || volunteer.email,
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
};
