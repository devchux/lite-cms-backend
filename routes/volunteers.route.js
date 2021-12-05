const router = require("express").Router();
const { getSingleMember } = require("../controllers/members.controller");
const {
  getAllVolunteers,
  createVolunteers,
  deleteVolunteer,
  updateVolunteer,
} = require("../controllers/volunteers.controller");

router.route("/").post(createVolunteers).get(getAllVolunteers);

router
  .route("/:id")
  .delete(deleteVolunteer)
  .put(updateVolunteer)
  .get(getSingleMember);

module.exports = router;
