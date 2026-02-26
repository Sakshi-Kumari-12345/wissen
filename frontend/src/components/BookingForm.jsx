import { useState } from "react";
import api from "../api";

export default function BookingForm({ date }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    batch: 1
  });

  const handleSubmit = async () => {
    try {
      await api.post("/bookings/book", { ...form, date });
      alert("Seat Booked Successfully ✅");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="card premium-form">
      <h2 className="form-title">Book Your Seat</h2>

      <div className="form-row" >
        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <label>Email</label>
        </div>

        <div className="select-group">
          <select
            onChange={(e) =>
              setForm({ ...form, batch: Number(e.target.value) })
            }
          >
            <option value={1}>Batch 1 (Mon-Wed)</option>
            <option value={2}>Batch 2 (Thu-Fri)</option>
          </select>
        </div>

        <button className="btn-book" onClick={handleSubmit}>
          Book Seat
        </button>
      </div>
    </div>
  );
}