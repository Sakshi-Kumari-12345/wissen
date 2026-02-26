import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);

      // Countdown to 3PM
      const target = new Date();
      target.setHours(15, 0, 0, 0);

      if (now < target) {
        const diff = target - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setCountdown(`${hrs}h ${mins}m ${secs}s until buffer opens`);
      } else {
        setCountdown("Buffer Booking OPEN 🔥");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day = time.getDay();

  let batchLabel = "";
  let batchColor = "#94a3b8";

  if ([1, 2, 3].includes(day)) {
    batchLabel = "Batch 1 Working Day";
    batchColor = "#3b82f6";
  } else if ([4, 5].includes(day)) {
    batchLabel = "Batch 2 Working Day";
    batchColor = "#10b981";
  } else {
    batchLabel = "Weekend - Booking Closed";
    batchColor = "#ef4444";
  }

  return (
    <div className="header premium-header">
      <div>
        <h1 className="title">Seat Booking System</h1>
        <small className="subtitle">
          Maximum Space Utilization Portal
        </small>
      </div>

      <div className="header-right">
        <div className="digital-clock">
          {time.toLocaleTimeString("en-IN")}
        </div>

        <div className="date-line">
          {time.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <div
          className="batch-badge"
          style={{ background: batchColor }}
        >
          {batchLabel}
        </div>

        <div className="buffer-countdown">
          {countdown}
        </div>
      </div>
    </div>
  );
}
