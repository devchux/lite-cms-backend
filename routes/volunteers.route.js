const router = require("express").Router();
const {
  getAllVolunteers,
  createVolunteers,
  deleteVolunteer,
  updateVolunteer,
  deleteBulkVolunteers,
  getSingleVolunteer,
} = require("../controllers/volunteers.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

router
  .route("/")
  .post(createVolunteers)
  .get(verifyToken, getAllVolunteers)
  .delete(verifyToken, verifyAdmin, deleteBulkVolunteers);

router
  .route("/:id")
  .delete(verifyToken, verifyAdmin, deleteVolunteer)
  .put(verifyToken, verifyAdmin, updateVolunteer)
  .get(verifyToken, verifyAdmin, getSingleVolunteer);

module.exports = router;
