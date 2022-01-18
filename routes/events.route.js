const {
  getAllEvents,
  createEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  deleteBulkEvent,
} = require("../controllers/events.controller");
const { verifyAdmin } = require("../utils/verifyAdmin");
const verifyToken = require("../utils/verifyToken");

const router = require("express").Router();

router
  .route("/")
  .get(getAllEvents)
  .post(verifyToken, createEvent)
  .delete(verifyToken, verifyAdmin, deleteBulkEvent);

router
  .route("/:id")
  .get(getSingleEvent)
  .put(verifyToken, updateEvent)
  .delete(verifyToken, verifyAdmin, deleteEvent);

module.exports = router;
