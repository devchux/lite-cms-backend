const {
  createMembers,
  getAllMembers,
  updateMember,
  deleteMember,
  getSingleMember,
} = require("../controllers/members.controller");

const router = require("express").Router();

router.route("/").post(createMembers).get(getAllMembers);

router
  .route("/:id")
  .put(updateMember)
  .delete(deleteMember)
  .get(getSingleMember);

module.exports = router;
