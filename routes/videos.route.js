const {
  uploadVideo,
  uploadMoreVideos,
  deleteVideoFromDb,
  getAllVideos,
} = require("../controllers/videos.controller");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").post(verifyToken, uploadVideo).get(getAllVideos);
router
  .route("/:id")
  .post(verifyToken, uploadMoreVideos)
  .delete(verifyToken, deleteVideoFromDb);

module.exports = router;
