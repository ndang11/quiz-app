import React, { useState, useEffect } from 'react';

export default function Timer({ duration, onTimeout }) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeout();
      return;
    }
    const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [secondsLeft, onTimeout]);

  return <div>Time left: {secondsLeft} seconds</div>;
}
