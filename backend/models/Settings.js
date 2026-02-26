const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  totalSeats: {
    type: Number,
    default: 50
  },
  batch1Spots: {
    type: Number,
    default: 5
  },
  batch2Spots: {
    type: Number,
    default: 5
  },
  membersPerSpot: {
    type: Number,
    default: 8
  }
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);