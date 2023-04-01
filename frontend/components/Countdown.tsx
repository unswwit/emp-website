import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Countdown() {
  return (
    <div className={styles.divider}>
      <p>
        <strong>Sign ups open in:</strong>
      </p>
      <h2>3 weeks, 2 days, 5 hours</h2>
    </div>
  );
}
