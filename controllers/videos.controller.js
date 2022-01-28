const VideoSubject = require("../models/video-subject.model");
const Video = require("../models/videos.model");
const logger = require("../utils/logger");
const { getPagination, getPagingData } = require("../utils/pagination");

exports.uploadVideo = (req, res) => {
  const { title, videoDescription, videoTitle, videoUrl, slug } = req.body;
  VideoSubject.create({ title }).then(async (subject) => {
    try {
      const videoDb = await Video.create({
        videoUrl,
        slug,
        VideoSubjectId: subject.id,
        MemberId: req.user.userId,
        title: videoTitle,
        description: videoDescription,
      });
      return res.status(201).json({
        status: "success",
        message: "Video has been created",
        subject,
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
  const subject = await VideoSubject.findByPk(req.params.id);
  if (!subject) {
    return res.status(400).json({
      status: "error",
      message: "Video Subject does not exist",
    });
  }
  try {
    const videoDb = await Video.create({
      videoUrl: req.body.videoUrl,
      VideoSubjectId: subject.id,
      MemberId: req.user.userId,
      slug: req.body.slug,
      title: req.body.videoTitle,
      description: req.body.videoDescription,
    });
    return res.status(201).json({
      status: "success",
      message: "Video has been created",
      subject,
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
};

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
        message: error.message,
        status: "error",
      });
    });
};

exports.getAllVideos = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const videos = await Video.findAndCountAll({
      where: {
        slug: req.params.slug,
      },
      limit,
      offset,
    });

    const data = getPagingData(videos, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Videos has been fetched",
      videos: data,
    });
  } catch (error) {
    logger.error(
      `(getAllVideos) Videos could not be fetched: ${error.message}`
    );
    return res.status(400).json({
      status: "error",
      message: "Videos could not be fetched",
    });
  }
};

exports.getVideoSubjects = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const subjects = await VideoSubject.findAndCountAll({ limit, offset });

    const data = getPagingData(subjects, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Video subjects have been fetched",
      subjects: data,
    });
  } catch (error) {
    logger.error(
      `(getVideoSubjects) Video subjects could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getSingleVideoSubject = async (req, res) => {
  try {
    const subject = await VideoSubject.findByPk(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Video subject have been fetched",
      subject,
    });
  } catch (error) {
    logger.error(
      `(getSingleVideoSubject) Video subject could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateVideoSubject = async (req, res) => {
  try {
    const subject = await VideoSubject.findByPk(req.params.id);

    if (!subject)
      return res.status(404).json({
        status: "error",
        message: "Subject does not exist",
      });

    const newSubject = await subject.update({
      title: req.body.title || subject.title,
    });

    await Video.update(
      { slug: req.body.slug },
      { where: { VideoSubjectId: newSubject.id } }
    );

    // await videos.update({ slug: req.body.slug })

    return res.status(200).json({
      status: "success",
      message: "Video subject have been fetched",
      subject: newSubject,
    });
  } catch (error) {
    logger.error(
      `(updateVideoSubject) Video subject could not be updated: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteVideoSubject = (req, res) => {
  VideoSubject.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Video collection has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteVideoSubject) Video collection could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Video collection was not deleted",
        status: "error",
      });
    });
};
