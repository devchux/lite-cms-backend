const {
  getAllArticles,
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticleBySlug,
} = require("../controllers/articles.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router.route("/").get(getAllArticles).post(verifyToken, createArticle);
router
  .route("/:id")
  .get(verifyToken, findArticleById)
  .put(verifyToken, updateArticle)
  .delete(verifyToken, verifyAdmin, deleteArticle);
router.route("/slug/:slug").get(findArticleBySlug);

module.exports = router;
