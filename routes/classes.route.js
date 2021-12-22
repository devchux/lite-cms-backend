const {
  findUserByClass,
  createClass,
  findAndCountAllClasses,
  deleteClass,
} = require("../controllers/classes.controller");
const router = require("express").Router();

router.route("/").post(createClass).get(findAndCountAllClasses);
router.route("/:title").get(findUserByClass);
router.route("/:id").delete(deleteClass);

module.exports = router;
