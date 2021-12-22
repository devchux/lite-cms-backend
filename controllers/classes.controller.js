const Class = require("../models/classes.model");
const { getPagination, getPagingData } = require("../utils/pagination");

exports.createClass = async (req, res) => {
  const { name, email, phoneNumber, title } = req.body;
  try {
    const userClass = await Class.create({
      name,
      email,
      phoneNumber,
      class: title,
    });

    return res.status(201).json({
      status: "success",
      message: "Entry sent",
      class: userClass,
    });
  } catch (error) {
    logger.error(`(createClass) Class could not be created: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
};

exports.findUserByClass = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const classes = await Class.findAndCountAll({
      where: {
        class: req.params.title,
      },
      limit,
      offset,
    });

    const data = getPagingData(classes, page, limit)

    return res.status(200).json({
      status: "success",
      message: "Classes have been fetched",
      classes: data,
    });
  } catch (error) {
    logger.error(
      `(findUserByClass) Class could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
};

exports.findAndCountAllClasses = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const classes = await Class.findAndCountAll({ limit, offset });

    const data = getPagingData(classes, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Classes have been fetched",
      classes: data,
    });
  } catch (error) {
    logger.error(
      `(findAndCountAllClasses) Class could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
};

exports.deleteClass = async (req, res) => {
  Class.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Class has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteClass) Class could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Class was not deleted",
        status: "error",
      });
    });
};
