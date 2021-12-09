const {
  createMembers,
  getAllMembers,
  updateMember,
  deleteMember,
  getSingleMember,
} = require("../controllers/members.controller");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router.route("/").post(createMembers).get(verifyToken, getAllMembers);

router
  .route("/:id")
  .put(verifyToken, updateMember)
  .delete(verifyToken, deleteMember)
  .get(verifyToken, getSingleMember);

module.exports = router;
