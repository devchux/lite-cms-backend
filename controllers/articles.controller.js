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
      message: "An error occured",
      status: "error",
    });
  }
}