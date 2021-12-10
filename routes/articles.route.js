const {
  getAllArticles,
  createArticle,
  findArticleById,
  updateArticle,
  deleteArticle,
  findArticleBySlug,
} = require("../controllers/articles.controller");

const router = require("express").Router();

router.route("/").get(getAllArticles).post(createArticle);
router
  .route("/:id")
  .get(findArticleById)
  .put(updateArticle)
  .delete(deleteArticle);
router.route("/slug/:slug").get(findArticleBySlug);

module.exports = router;
