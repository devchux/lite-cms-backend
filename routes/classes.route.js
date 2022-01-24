const {
  findUserByClass,
  createClass,
  findAndCountAllClasses,
  deleteClass,
} = require("../controllers/classes.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router.route("/").post(createClass).get(verifyToken, findAndCountAllClasses);
router.route("/title/:title").get(verifyToken, findUserByClass);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteClass);

module.exports = router;
