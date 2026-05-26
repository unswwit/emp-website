import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function StayInTheLoop() {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open('https://www.facebook.com/events/545237864225826', '_blank');
  };

  return (
    <section className={styles.loopSection} id="apply">
      <div className={styles.loopContent}>
        <div className={styles.loopSectionLabel}>
          <span className={styles.sectionLabelNum}>06</span>
          <span className={styles.sectionLabelDash} />
          <span>Stay in the Loop</span>
        </div>
        <h2 className={styles.loopTitle}>Applications open soon.</h2>
        <p className={styles.loopSubtitle}>
          Drop your email and we&rsquo;ll let you know the moment the {year} cohort opens.
        </p>
        <form className={styles.emailForm} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.emailInput}
          />
          <button type="submit" className={styles.remindBtn}>
            Remind me
          </button>
        </form>
      </div>
    </section>
  );
}
