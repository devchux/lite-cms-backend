const {
  getAllArticles,
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticleBySlug,
  deleteArticles,
} = require("../controllers/articles.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router
  .route("/")
  .get(getAllArticles)
  .post(verifyToken, createArticle)
  .delete(verifyToken, deleteArticles);
router
  .route("/:id")
  .get(verifyToken, findArticleById)
  .put(verifyToken, updateArticle)
  .delete(verifyToken, verifyAdmin, deleteArticle);
router.route("/slug/:slug").get(findArticleBySlug);

module.exports = router;
