import React, { useState, useEffect } from "react";

export default function Timer({ duration, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  // Reset timer when a new question loads
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeout]);

  return <p className="time"> ⏱ Time left: {timeLeft}s</p>;
}
