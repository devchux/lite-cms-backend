const {
  createMembers,
  getAllMembers,
  updateMember,
  deleteMember,
} = require("../controllers/members.controller");

const router = require("express").Router();

router.route("/").post(createMembers).get(getAllMembers);

router.route("/:id").put(updateMember).delete(deleteMember);

module.exports = router;
