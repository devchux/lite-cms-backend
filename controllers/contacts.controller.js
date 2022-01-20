const Contact = require("../models/contacts.model");
const logger = require("../utils/logger");
const { getPagingData, getPagination } = require("../utils/pagination");

exports.createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, subject, message });
    return res.status(201).json({
      status: "success",
      message: "Message sent",
      contact,
    });
  } catch (error) {
    logger.error(
      `(createContact) contact could not be cerated: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllContacts = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const contacts = await Contact.findAndCountAll({ limit, offset });

    const data = getPagingData(contacts, page, limit)

    return res.status(200).json({
      status: "success",
      message: "Contacts have been fetched",
      contacts: data,
    });
  } catch (error) {
    logger.error(
      `(getAllContacts) contacts could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getSingleContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Contact has been fetched",
      contact,
    });
  } catch (error) {
    logger.error(
      `(getSingleContact) contact could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteContact = async (req, res) => {
  Contact.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Contact has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteContact) Contact could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
        status: "error",
      });
    });
};
