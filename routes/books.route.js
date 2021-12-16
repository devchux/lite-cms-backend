const {
  getAllBooks,
  addBook,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/books.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");
const router = require("express").Router();

router.route("/").get(getAllBooks).post(verifyToken, addBook);

router
  .route("/:id")
  .get(getSingleBook)
  .put(verifyToken, updateBook)
  .delete(verifyToken, verifyAdmin, deleteBook);

module.exports = router;
