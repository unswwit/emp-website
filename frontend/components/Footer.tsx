import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Footer() {
  return (
    <div className={styles.divider}>
      <div className={styles.flex}>
        <Image
          src="/WIT-logo-white.png"
          alt="UNSWWIT Logo"
          className={styles.footerLogo}
          width={50}
          height={50}
          priority
        />
        <p>© UNSW Women in Technology 2023</p>
        <button className={styles.footerButton}>Register Now</button>
      </div>
      <Image
        src="/icons.png"
        alt="Social Media Icons"
        className={styles.footerIcons}
        width={350}
        height={100}
        priority
      />
    </div>
  );
}
