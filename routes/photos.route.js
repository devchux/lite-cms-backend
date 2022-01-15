const { getAllPhotos, uploadPhoto, deletePhoto } = require('../controllers/photos.controller');
const verifyToken = require("../utils/verifyToken");

const router = require('express').Router();

router.route('/').get(verifyToken, getAllPhotos).post(verifyToken, uploadPhoto)

router.route('/:id').delete(verifyToken, deletePhoto)

module.exports = router