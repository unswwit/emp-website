import React, { useState, useEffect } from 'react';

const CountDown = ({ targetDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(
    Math.floor((targetDate - currentDate) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setTimeRemaining(Math.floor((targetDate - currentDate) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const calculateMonths = () => {
    return Math.floor(timeRemaining / (60 * 60 * 24 * 30));
  };

  const calculateWeeks = () => {
    return Math.floor(timeRemaining / (60 * 60 * 24 * 7));
  };

  const calculateDays = () => {
    return Math.floor(timeRemaining / (60 * 60 * 24));
  };

  const calculateHours = () => {
    const hours = Math.floor(timeRemaining / (60 * 60));
    if (hours >= 24) {
      return hours;
    } else {
      return hours;
    }
    
  };

  const calculateMinutes = () => {
    const mins = Math.floor(timeRemaining / 60);
    if (mins >= 60) {
      return mins;
    } else {
      return mins;
    }
  };

  const calculateSeconds = () => {
    return timeRemaining % 60;
  };

  const months = calculateMonths();
  const weeks = calculateWeeks();
  const days = calculateDays();
  const hours = calculateHours();
  const minutes = calculateMinutes();
  const seconds = calculateSeconds();

  if (weeks >= 4) {
    return (
      <div className="countdown">
        <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
        <ul className="countdown-values">
          <li>{months} months</li>
        </ul>
      </div>
    );
  }

  if (days >= 7) {
    return (
      <div className="countdown">
        <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
        <ul className="countdown-values">
          <p>{months} months &nbsp; {weeks} weeks </p>
        </ul>
      </div>
    );
  }

  if (hours >= 24) {
    return (
      <div className="countdown">
        <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
        <ul className="countdown-values">
          <li>{months} months &nbsp; {weeks} weeks &nbsp; {days} days</li>
        </ul>
      </div>
    );
  }

  if (minutes >= 60) {
    return (
      <div className="countdown">
        <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
        <ul className="countdown-values">
          <li>{months} months &nbsp; {weeks} weeks &nbsp; {days} days &nbsp; {hours} hours</li>
        </ul>
      </div>
    );
  }

  if (seconds >= 60) {
    <div className="countdown">
      <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
      <ul className="countdown-values">
        <li>{months} months &nbsp; {weeks} weeks &nbsp; {days} days &nbsp; {hours} hours &nbsp; {minutes} minutes</li>
      </ul>
    </div>
  }

  return (
    <div className="countdown">
      <h1>Countdown to {targetDate.toLocaleDateString()}</h1>
      <ul className="countdown-values">
        <li>{months} months &nbsp; {weeks} weeks &nbsp; {days} days</li>
        <li>{hours} hours</li>
        <li>{minutes} minutes</li>
        <li>{seconds} seconds</li>
      </ul>
    </div>
  );
};

export default CountDown;