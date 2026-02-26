const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: Date,
  isBuffer: Boolean,
  seatNumber: Number
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);