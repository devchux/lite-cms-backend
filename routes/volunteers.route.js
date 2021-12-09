const router = require("express").Router();
const { getSingleMember } = require("../controllers/members.controller");
const {
  getAllVolunteers,
  createVolunteers,
  deleteVolunteer,
  updateVolunteer,
} = require("../controllers/volunteers.controller");
const verifyToken = require("../utils/verifyToken");

router.route("/").post(createVolunteers).get(verifyToken, getAllVolunteers);

router
  .route("/:id")
  .delete(verifyToken, deleteVolunteer)
  .put(verifyToken, updateVolunteer)
  .get(verifyToken, getSingleMember);

module.exports = router;
