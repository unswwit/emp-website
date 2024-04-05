import styles from '../styles/Home.module.css';
import { compareAsc, getWeekYear } from 'date-fns';
import CountDown from './Count.js';

export default function Countdown() {
  const targetDate = new Date('2024-04-22T00:00:00Z');
  const currentDate = new Date();
  const compareDate = compareAsc(currentDate, targetDate);

  // today's date is after the date given by developer
  if (compareDate === 1) {
    if (getWeekYear(targetDate) === getWeekYear(currentDate)) {
      return (
        <div className={styles.divider}>
          <h2>Sign ups for {getWeekYear(currentDate)} coming soon.</h2>
        </div>
      );
    } else {
      return (
        <div className={styles.divider}>
          <h2>Sign ups for {getWeekYear(currentDate)} have closed.</h2>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.divider}>
        <CountDown targetDate={targetDate} />
      </div>
    );
  }
}
