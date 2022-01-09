const {
  createMembers,
  getAllMembers,
  updateMember,
  deleteMember,
  getSingleMember,
  loginMember,
  deleteBulkMembers,
} = require("../controllers/members.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router
  .route("/")
  .post(createMembers)
  .get(verifyToken, getAllMembers)
  .delete(verifyToken, verifyAdmin, deleteBulkMembers);

router.route("/login").post(loginMember);

router
  .route("/:id")
  .put(verifyToken, updateMember)
  .delete(verifyToken, verifyAdmin, deleteMember)
  .get(verifyToken, getSingleMember);

module.exports = router;
