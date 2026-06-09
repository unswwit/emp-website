import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Hero() {
  const year = new Date().getFullYear();

  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroLeft}>
        <div className={styles.heroLabel}>
          <span>UNSW · WIT</span>
          <span className={styles.heroLabelDash} />
          <span>{year} Edition</span>
        </div>
        <h1 className={styles.heroTitle}>
          Empowerment
          <br />
          Mentoring
          <br />
          {year}.
        </h1>
        <p className={styles.heroSubtitle}>
          A two-term industry mentoring program for women &amp; gender-diverse students at UNSW.
          One-to-one matches with engineers, product managers, designers and analysts.
          AHEGS-accredited.
        </p>
        <div className={styles.heroActions}>
          <a href="#partners" className={styles.heroBtnSecondary}>
            Partner with WIT
          </a>
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.heroDecorBlob} />
        <div className={styles.heroImageWrapper}>
          {/* Replace /hero.png with your cohort photo */}
          <Image
            src="/hero.png"
            alt="WIT Empowerment Mentoring cohort"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
