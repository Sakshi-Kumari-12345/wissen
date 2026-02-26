import { useState } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [bookings, setBookings] = useState([]);

  return (
    <div className="background">
      <div className="app-container">
        <Header />

        <div className="dashboard">
          {/* LEFT PANEL */}
          <div className="left-panel">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            <BookingForm
              date={selectedDate}
              bookings={bookings}
              setBookings={setBookings}
            />
          </div>

          {/* RIGHT PANEL */}
          <div className="right-panel">
            <BookingList
              date={selectedDate}
              bookings={bookings}
              setBookings={setBookings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;