const Photo = require("../models/photos.model");
const { fileUpload } = require("../utils/fileUpload");
const logger = require("../utils/logger");

exports.uploadPhoto = async (req, res) => {
  const upload = fileUpload(
    ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    "photo"
  );

  upload(req, res, (err) => {
    if (err) {
      logger.error(`(uploadPhoto) Multer Photo upload error: ${err.message}`);
      return res.status(400).json({
        status: "error",
        message: "Image could not be uploaded",
      });
    }

    const { path } = req.file;

    const fName = req.file.originalname.split(".")[0];
    cloudinaryV2.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `PhotoUploads/${fName}`,
      },
      async (err, photo) => {
        if (err) {
          logger.error(
            `(uploadPhoto) Cloudinary Photo upload error: ${err.message}`
          );
          return res.status(400).json({
            status: "error",
            message: "Image could not be uploaded",
          });
        }

        fs.unlinkSync(path);
        try {
          const photoDb = await Photo.create({
            photoUrl: photo.secure_url,
          });
          return res.status(201).json({
            status: "success",
            message: "Photo has been created",
            audio: photoDb,
          });
        } catch (error) {
          logger.error(
            `(uploadPhoto) Photo could not be registered in database: ${error.message}`
          );
          return res.status(400).json({
            status: "error",
            message: "Photo could not be uploaded",
          });
        }
      }
    );
  });
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll();

    return res.status(200).json({
      status: "success",
      message: "Photos has been fetched",
      photos,
    });
  } catch (error) {
    logger.error(`(getAllPhotos) Photos could not be fetched: ${error.message}`);
    return res.status(400).json({
      status: "error",
      message: "Photos could not be fetched",
    });
  }
};

exports.deletePhoto = (req, res) => {
  Photo.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Photo has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deletePhoto) Photo could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Photo was not deleted",
        status: "error",
      });
    });
};