import { useEffect, useState, useMemo } from "react";
import api from "../api";

export default function BookingList({ date }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/bookings?date=${date}`);
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    if (date) fetchBookings();
  }, [date]);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  // Create fast lookup map
  const seatMap = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      map.set(b.seatNumber, b);
    });
    return map;
  }, [bookings]);

  const seats = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="card">
      <h3>Office Seat Layout</h3>

      <div className="seat-grid">
        {seats.map((seatNumber) => {
          const booking = seatMap.get(seatNumber);

          let seatClass = "available";
          if (booking) {
            seatClass = booking.isBuffer ? "buffer" : "booked";
          }

          return (
            <div
              key={seatNumber}
              className={`seat-wrapper ${seatClass}`}
              title={
                booking
                  ? `${booking.userId?.name} (${booking.userId?.email})`
                  : "Available"
              }
            >
              <div className="seat">
                <div className="seat-back"></div>
                <div className="seat-base"></div>
                <div className="seat-number">{seatNumber}</div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ marginTop: "30px" }}>Bookings</h3>

      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map((b) => (
        <div key={b._id} className="booking-item">
          <div>
            <strong style={{ marginRight: "10px" }}>
            {b.userId?.name}
            </strong>
            <span>{b.userId?.email}</span>
            {b.isBuffer && (
              <div className="buffer-label">Buffer Seat</div>
            )}
          </div>

          <button
            className="btn-danger"
            onClick={() => handleCancel(b._id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}