const Booking = require("../models/Booking");
const User = require("../models/User");

exports.bookSeat = async (req, res) => {
  try {
    const { name, email, batch, date } = req.body;

    if (!name || !email || !batch || !date)
      return res.status(400).json({ message: "All fields required" });

    const bookingDate = new Date(date);
    const today = new Date();
    const bookingDay = bookingDate.getDay();

    if (bookingDay === 0 || bookingDay === 6)
      return res.status(400).json({ message: "Weekend booking not allowed" });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const bookingStart = new Date(bookingDate);
    bookingStart.setHours(0, 0, 0, 0);

    const twoWeeksLater = new Date(todayStart);
    twoWeeksLater.setDate(todayStart.getDate() + 14);

    if (bookingStart < todayStart || bookingStart > twoWeeksLater)
      return res.status(400).json({ message: "Booking allowed for 2 weeks only" });

    const isBatchDay =
      (batch === 1 && [1,2,3].includes(bookingDay)) ||
      (batch === 2 && [4,5].includes(bookingDay));

    let isBuffer = false;

    if (!isBatchDay) {
      if (today.getHours() < 15)
        return res.status(400).json({
          message: "Buffer booking allowed after 3PM"
        });

      const tomorrow = new Date(todayStart);
      tomorrow.setDate(todayStart.getDate() + 1);

      if (bookingStart.getTime() !== tomorrow.getTime())
        return res.status(400).json({
          message: "Buffer booking only for next day"
        });

      isBuffer = true;
    }

    const start = new Date(bookingStart);
    const end = new Date(bookingStart);
    end.setHours(23, 59, 59, 999);

    const existingBookings = await Booking.find({
      date: { $gte: start, $lte: end }
    });

    if (existingBookings.length >= 50)
      return res.status(400).json({ message: "All seats booked" });

    const regularCount = existingBookings.filter(b => !b.isBuffer).length;
    if (!isBuffer && regularCount >= 40)
      return res.status(400).json({ message: "Regular seats full" });

    const bookedSeats = existingBookings.map(b => b.seatNumber);

    let assignedSeat = null;
    for (let i = 1; i <= 50; i++) {
      if (!bookedSeats.includes(i)) {
        assignedSeat = i;
        break;
      }
    }

    const user = await User.findOneAndUpdate(
      { email },
      { name, email, batch },
      { upsert: true, new: true }
    );

    const duplicate = await Booking.findOne({
      userId: user._id,
      date: { $gte: start, $lte: end }
    });

    if (duplicate)
      return res.status(400).json({ message: "Already booked for this date" });

    const booking = await Booking.create({
      userId: user._id,
      date: bookingStart,
      isBuffer,
      seatNumber: assignedSeat
    });

    res.json(booking);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookings = async (req, res) => {
  const selected = new Date(req.query.date);
  selected.setHours(0,0,0,0);

  const end = new Date(selected);
  end.setHours(23,59,59,999);

  const bookings = await Booking.find({
    date: { $gte: selected, $lte: end }
  }).populate("userId");

  res.json({ bookings });
};

exports.cancelBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking cancelled" });
};