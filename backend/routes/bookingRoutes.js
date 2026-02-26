const express = require("express");
const router = express.Router();

const {
  bookSeat,
  getBookings,
  cancelBooking
} = require("../controllers/bookingController");

router.post("/book", bookSeat);
router.get("/", getBookings);
router.delete("/:id", cancelBooking);

module.exports = router;