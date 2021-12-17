const {
  findUserByClass,
  createClass,
  findAllClasses,
  deleteClass,
} = require("../controllers/classes.controller");
const router = require("express").Router();

router.route("/").post(createClass).get(findAllClasses);
router.route("/:title").get(findUserByClass);
router.route("/:id").delete(deleteClass);

module.exports = router;
