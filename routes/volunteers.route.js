const router = require("express").Router();
const { getSingleMember } = require("../controllers/members.controller");
const {
  getAllVolunteers,
  createVolunteers,
  deleteVolunteer,
  updateVolunteer,
} = require("../controllers/volunteers.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

router.route("/").post(createVolunteers).get(verifyToken, getAllVolunteers);

router
  .route("/:id")
  .delete(verifyToken, verifyAdmin, deleteVolunteer)
  .put(verifyToken, verifyAdmin, updateVolunteer)
  .get(verifyToken, verifyAdmin, getSingleMember);

module.exports = router;
