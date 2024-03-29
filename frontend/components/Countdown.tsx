import styles from '../styles/Home.module.css';
import { compareAsc, getWeekYear } from 'date-fns';
import CountDown from './Count.js';

export default function Countdown({ date }: { date: Date }) {
  const targetDate = new Date('2024-04-22T00:00:00Z');
  const variable = compareAsc(date, targetDate);

  // today's date is after the date given by developer
  if (variable === 1) {
    if (getWeekYear(targetDate) == 2023 && getWeekYear(date) >= 2024) {
      return (
        <div className={styles.divider}>
          <h2>Sign ups for 2024 coming soon.</h2>
        </div>
      );
    } else {
      return (
        <div className={styles.divider}>
          <h2>Sign ups for 2023 have closed.</h2>
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
