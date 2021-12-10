const { getAllPhotos, uploadPhoto, deletePhoto } = require('../controllers/photos.controller');

const router = require('express').Router();

router.route('/').get(getAllPhotos).post(uploadPhoto)

router.route('/:id').delete(deletePhoto)

module.exports = router