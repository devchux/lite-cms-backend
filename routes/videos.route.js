const {
  uploadVideo,
  uploadMoreVideos,
  deleteVideoFromDb,
} = require("../controllers/videos.controller");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadVideo);
router
  .route("/:id")
  .post(verifyToken, uploadMoreVideos)
  .delete(verifyToken, deleteVideoFromDb);

module.exports = router;
