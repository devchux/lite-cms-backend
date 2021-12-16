const {
  uploadVideo,
  uploadMoreVideos,
  deleteVideoFromDb,
  getAllVideos,
  getVideoSubjects,
  getSingleVideoSubject,
  updateVideoSubject,
  deleteVideoSubject,
} = require("../controllers/videos.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadVideo).get(getAllVideos);
router
  .route("/:id")
  .post(verifyToken, uploadMoreVideos)
  .delete(verifyToken, verifyAdmin, deleteVideoFromDb);
router.route("/subjects").get(getVideoSubjects);
router
  .route("/subjects/:id")
  .get(getSingleVideoSubject)
  .put(verifyToken, updateVideoSubject)
  .delete(verifyToken, verifyAdmin, deleteVideoSubject);

module.exports = router;
