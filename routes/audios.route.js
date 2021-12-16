const {
  uploadAudio,
  uploadMoreAudio,
  deleteAudioFromDb,
  getAudios,
  getAudioSubjects,
  getSingleAudioSubject,
  updateAudioSubject,
  deleteAudioSubject,
} = require("../controllers/audios.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadAudio).get(getAudios);
router
  .route("/:id")
  .post(verifyToken, uploadMoreAudio)
  .delete(verifyToken, verifyAdmin, deleteAudioFromDb);
router.route("/subjects").get(getAudioSubjects);
router
  .route("/subjects/:id")
  .get(getSingleAudioSubject)
  .put(verifyToken, updateAudioSubject)
  .delete(verifyToken, verifyAdmin, deleteAudioSubject);

module.exports = router;
