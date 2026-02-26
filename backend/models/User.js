const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  batch: Number
});

module.exports = mongoose.model("User", userSchema);