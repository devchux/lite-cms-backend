const { getAllArticles } = require('../controllers/articles.controller');

const router = require('express').Router();

router.route('/').get(getAllArticles)

module.exports = router;
