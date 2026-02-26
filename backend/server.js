const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
mongoose.connect("mongodb://localhost:27017/seatbooking");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

app.listen(5000, () =>
  console.log("Backend running on port 5000")
);

// Email: manager@admin.com
// Password: 1234