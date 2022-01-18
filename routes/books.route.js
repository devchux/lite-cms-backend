const {
  getAllBooks,
  addBook,
  getSingleBook,
  updateBook,
  deleteBook,
  deleteBulkBooks,
} = require("../controllers/books.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router
  .route("/")
  .get(getAllBooks)
  .post(verifyToken, addBook)
  .delete(verifyToken, verifyAdmin, deleteBulkBooks);

router
  .route("/:id")
  .get(getSingleBook)
  .put(verifyToken, updateBook)
  .delete(verifyToken, verifyAdmin, deleteBook);

module.exports = router;
