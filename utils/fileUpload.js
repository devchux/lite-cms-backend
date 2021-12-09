const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const {
  cloudinaryAPICloudName,
  cloudinaryAPIKey,
  cloudinaryAPISecret,
} = require("../config/constants");

cloudinary.config({
  cloud_name: cloudinaryAPICloudName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret,
});

exports.fileUpload = (fileFormat, fileType) => {
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (fileFormat.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 200,
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single(fileType);

  return upload;
}

exports.cloudinaryV2 = cloudinary;