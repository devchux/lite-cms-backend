const {
  getAllContacts,
  createContact,
  getSingleContact,
  deleteContact,
} = require("../controllers/contacts.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router.route("/").get(verifyToken, getAllContacts).post(createContact);

router
  .route("/:id")
  .get(verifyToken, getSingleContact)
  .delete(verifyToken, verifyAdmin, deleteContact);

module.exports = router;
