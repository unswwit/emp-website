import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const CountDown = ({ targetDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(Math.floor((targetDate - currentDate) / 1000));

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

  return (
    <div className="countdown">
      <h1>Registration opens in </h1>
      <h1 className={styles.countdownValues}>
        {months !== 0 && <span> {months} months </span>}
        {weeks < 4 && weeks !== 0 && <span> {weeks} weeks </span>}
        {days <= 31 && days !== 0 && <span> {days} days </span>}
        {hours <= 24 && hours !== 0 && <span> {hours} hours</span>}
        {minutes <= 60 && minutes !== 0 && <span> {minutes} minutes</span>}
        {seconds >= 60 && <span> {seconds} seconds</span>}
      </h1>
    </div>
  );
};

export default CountDown;
