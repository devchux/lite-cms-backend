const {
  getAllArticles,
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticleBySlug,
  deleteArticles,
  getPublishedArticles,
} = require("../controllers/articles.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router
  .route("/")
  .get(getAllArticles)
  .post(verifyToken, createArticle)
  .delete(verifyToken, verifyAdmin, deleteArticles);
router.route('/published').get(getPublishedArticles)
router.route("/slug/:slug").get(findArticleBySlug);
router
  .route("/:id")
  .get(verifyToken, findArticleById)
  .put(verifyToken, updateArticle)
  .delete(verifyToken, verifyAdmin, deleteArticle);

module.exports = router;
