const Member = require("../models/members.model");
const Article = require("../models/articles.model");
const logger = require("../utils/logger");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({ include: Member });

    return res.status(200).json({
      articles,
      message: "Here are the list of articles",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(getAllArticles) List of articles could not be fetched: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occurred",
      status: "error",
    });
  }
};

exports.createArticle = async (req, res) => {
  const { title, body, imageUrl, slug, published } = req.body;
  try {
    const article = await Article.create({
      title,
      body,
      imageUrl,
      slug,
      published,
      MemberId: req.user.userId,
    });
    return res.status(200).json({
      article,
      message: "Article has been created",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(createArticle) Article could not be created: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occurred",
      status: "error",
    });
  }
};

exports.findArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    return res.status(200).json({
      article,
      message: "Article has been fetched",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(findArticleById) Article could not be found: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occurred",
      status: "error",
    });
  }
};

exports.findArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    return res.status(200).json({
      article,
      message: "Article has been fetched",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(findArticleBySlug) Article could not be found: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occurred",
      status: "error",
    });
  }
};

exports.updateArticle = async (req, res) => {
  const { title, body, imageUrl, slug, published } = req.body;
  try {
    const article = await Article.findOne({
      where: { id: req.params.id },
      include: Member,
    });

    if (!article)
      return res.status(404).json({
        status: "error",
        message: "Article could not be found",
      });

    if (article.MemberId !== req.user.userId || req.user.role !== "admin")
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    const updatedArticle = await Article.update({
      title: title || article.title,
      body: body || article.body,
      imageUrl: imageUrl || article.imageUrl,
      slug: slug || article.slug,
      published: published || article.published,
    });
    return res.status(200).json({
      article: updatedArticle,
      message: "Article has been updated",
      status: "success",
    });
  } catch (error) {
    logger.error(
      `(updateArticle) Article could not be updated: ${error.message}`
    );
    return res.status(500).json({
      message: "An error occurred",
      status: "error",
    });
  }
};

exports.deleteArticle = (req, res) => {
  Article.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Article has been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteArticle) Article could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Article was not deleted",
        status: "error",
      });
    });
};
