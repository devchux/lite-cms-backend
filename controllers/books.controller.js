const Book = require("../models/books.model");
const logger = require("../utils/logger");

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
      message: "An error occured",
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    return res.status(200).json({
      status: "success",
      message: "Books have been fetched",
      books,
    });
  } catch (error) {
    logger.error(`(getAllBooks) Books could not be fetched: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: "An error occured",
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
      message: "An error occured",
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
      message: "An error occured",
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
      logger.error(
        `(deleteBook) Book could not be deleted: ${error.message}`
      );
      return res.status(500).json({
        message: "Book was not deleted",
        status: "error",
      });
    });
}
