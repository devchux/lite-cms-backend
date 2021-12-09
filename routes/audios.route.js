const {
  uploadAudio,
  uploadMoreAudio,
  deleteAudioFromDb,
} = require("../controllers/audios.controller");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadAudio);
router
  .route("/:id")
  .post(verifyToken, uploadMoreAudio)
  .delete(verifyToken, deleteAudioFromDb);

module.exports = router;
