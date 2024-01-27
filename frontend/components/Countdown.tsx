import styles from '../styles/Home.module.css';
import {
  format,
  compareAsc,
  formatDistanceToNowStrict,
  formatDistanceToNow,
} from 'date-fns';
import CountDown from './Count.js';

export default function Countdown() {
  const current_date = new Date();
  const targetDate = new Date('2023-11-22T00:00:00Z');
  const variable = compareAsc(current_date, new Date(2023, 10, 5, 2, 0, 0));
  // today's date is after the date given by developer
  if (variable === 1) {
    return (
      <div className={styles.divider}>
        <h2>Sign ups for 2023 have closed.</h2>
      </div>
    );
  } else {
    return (
      <div className={styles.divider}>
        <CountDown targetDate={targetDate} />
      </div>
    );
  }
}
