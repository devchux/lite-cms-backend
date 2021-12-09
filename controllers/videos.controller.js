const Subject = require("../models/subjects.model");
const Video = require("../models/videos.model");

exports.uploadVideo = (req, res) => {
  const { title, videoDescription, videoTitle, videoUrl } = req.body;
  Subject.create({ title }).then(async ({ id }) => {
    try {
      const videoDb = await Video.create({
        videoUrl,
        SubjectId: id,
        UserId: req.user.UserId,
        title: videoTitle,
        description: videoDescription,
      });
      return res.status(201).json({
        status: "success",
        message: "Video has been created",
        video: videoDb,
      });
    } catch (error) {
      logger.error(
        `(uploadVideo) Video could not be registered in database: ${error.message}`
      );
      return res.status(400).json({
        status: "error",
        message: "Video could not be uploaded",
      });
    }
  });
};

exports.uploadMoreVideos = async (req, res) => {
  const subject = await Subject.findByPk(req.params.id);
  if (!subject) {
    return res.status(400).json({
      status: "error",
      message: "Video Subject does not exist",
    });
  }
  try {
    const videoDb = await Video.create({
      videoUrl: req.body.videoUrl,
      SubjectId: subject.id,
      UserId: req.user.UserId,
      title: req.body.videoTitle,
      description: req.body.videoDescription,
    });
    return res.status(201).json({
      status: "success",
      message: "Video has been created",
      video: videoDb,
    });
  } catch (error) {
    logger.error(
      `(uploadMoreVideo) Video could not be registered in database: ${error.message}`
    );
    return res.status(400).json({
      status: "error",
      message: "Video could not be uploaded",
    });
  }

}

exports.deleteVideoFromDb = (req, res) => {
  Video.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Video has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteVideoFromDb) Video could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Video was not deleted",
        status: "error",
      });
    });
}
