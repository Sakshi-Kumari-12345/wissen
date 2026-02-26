import React from "react";

export default function Calendar({ selectedDate, setSelectedDate }) {
  const today = new Date();

  // Generate next 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  const formatDate = (date) =>
    date.toISOString().split("T")[0];

  // Get month + year from first date
  const monthYear = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar">
      <h3>Select Date</h3>

      {/* Month + Year Header */}
      <div className="calendar-header">
        {monthYear}
      </div>

      <div className="calendar-grid">
        {days.map((dateObj, index) => {
          const day = dateObj.getDay();
          const isWeekend = day === 0 || day === 6;

          const formatted = formatDate(dateObj);

          return (
            <button
              key={index}
              disabled={isWeekend}
              className={`calendar-day ${
                selectedDate === formatted ? "active" : ""
              } ${isWeekend ? "disabled" : ""}`}
              onClick={() => setSelectedDate(formatted)}
            >
              <div className="cal-weekday">
                {dateObj.toLocaleDateString("en-IN", { weekday: "short" })}
              </div>

              <div className="cal-date">
                {dateObj.getDate()}
              </div>

              <div className="cal-month">
                {dateObj.toLocaleDateString("en-IN", { month: "short" })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}