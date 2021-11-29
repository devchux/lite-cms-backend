const router = require("express").Router();
const {
  getAllVolunteers,
  createVolunteers,
  deleteVolunteer,
  updateVolunteer,
} = require("../controllers/volunteers.controller");

router.route("/").post(createVolunteers).get(getAllVolunteers);

router.route("/:id").delete(deleteVolunteer).put(updateVolunteer);

module.exports = router;
