const {
  uploadAudio,
  uploadMoreAudio,
  deleteAudioFromDb,
  getAudios,
} = require("../controllers/audios.controller");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadAudio).get(getAudios);
router
  .route("/:id")
  .post(verifyToken, uploadMoreAudio)
  .delete(verifyToken, deleteAudioFromDb);

module.exports = router;
