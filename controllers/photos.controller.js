const Photo = require("../models/photos.model");
const fs = require("fs");
const { fileUpload, cloudinaryV2 } = require("../utils/fileUpload");
const logger = require("../utils/logger");
const { getPagingData, getPagination } = require("../utils/pagination");

exports.uploadPhoto = async (req, res, next) => {
  const upload = fileUpload(
    ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    "photo"
  );

  upload(req, res, (err) => {
    if (err) {
      logger.error(`(uploadPhoto) Multer Photo upload error: ${err.message}`);
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
    if (!req.file) {
      return res.status(404).json({
        status: "error",
        message: "No image was uploaded",
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
            publicId: photo.public_id,
            photoUrl: photo.secure_url,
          });
          return res.status(201).json({
            status: "success",
            message: "Photo has been created",
            photo: photoDb,
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
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const photos = await Photo.findAndCountAll({
      offset,
      limit,
      order: [["updatedAt", "DESC"]],
    });

    const data = getPagingData(photos, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Photos has been fetched",
      photos: data,
    });
  } catch (error) {
    logger.error(
      `(getAllPhotos) Photos could not be fetched: ${error.message}`
    );
    return res.status(400).json({
      status: "error",
      message: "Photos could not be fetched",
    });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    await cloudinaryV2.uploader.destroy(photo.public_id);
    await photo.destroy();

    res.status(200).json({
      status: "success",
      message: "Photo has been deleted",
    });
  } catch (error) {
    logger.error(`(deletePhoto) Photo could not be deleted: ${error.message}`);
    return res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};
