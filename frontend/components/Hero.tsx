import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroText}>
        <h1>
          UNSW <br></br> Women in Technology
        </h1>
        <h3>
          2023 Empowerment<br></br> Mentoring
        </h3>
      </div>
      <Image
        src="/hero.png"
        alt="Empowerment Mentoring"
        className={styles.heroImage}
        width={750}
        height={550}
        priority
      />
    </div>
  );
}
