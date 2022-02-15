const Book = require("../models/books.model");
const logger = require("../utils/logger");
const { getPagination, getPagingData } = require("../utils/pagination");

exports.addBook = async (req, res) => {
  const { title, imageUrl, description, price, author } = req.body;
  try {
    const book = await Book.create({
      title,
      imageUrl,
      description,
      price,
      author,
    });

    return res.status(201).json({
      status: "success",
      message: "Book has been added",
      book,
    });
  } catch (error) {
    logger.error(`(addBook) Books could not be created: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    const books = await Book.findAndCountAll({
      limit,
      offset,
      order: [["updatedAt", "DESC"]],
    });

    const data = getPagingData(books, page, limit);

    return res.status(200).json({
      status: "success",
      message: "Books have been fetched",
      books: data,
    });
  } catch (error) {
    logger.error(`(getAllBooks) Books could not be fetched: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getSingleBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Book could not be found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Book has been fetched",
      book,
    });
  } catch (error) {
    logger.error(`(getSingleBook) Book could not be fetched: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  const { title, imageUrl, description, price, author } = req.body;
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      if (!book) {
        return res.status(404).json({
          status: "error",
          message: "Book could not be found",
        });
      }
    }
    const updatedBook = await book.update({
      title: title || book.title,
      imageUrl: imageUrl || book.imageUrl,
      description: description || book.description,
      price: price || book.price,
      author: author || book.author,
    });
    return res.status(200).json({
      status: "success",
      message: "Book has been updated",
      book: updatedBook,
    });
  } catch (error) {
    logger.error(`(updateBook) Book could not be updated: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Book has been deleted",
      })
    )
    .catch((error) => {
      logger.error(`(deleteBook) Book could not be deleted: ${error.message}`);
      return res.status(500).json({
        message: error.message,
        status: "error",
      });
    });
};

exports.deleteBulkBooks = async (req, res) => {
  Book.destroy({
    where: {
      id: req.body.ids,
    },
  })
    .then(() =>
      res.status(200).json({
        status: "success",
        message: "Books have been deleted",
      })
    )
    .catch((error) => {
      logger.error(
        `(deleteBulkBooks) Books could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
        status: "error",
      });
    });
};
