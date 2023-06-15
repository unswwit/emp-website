import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <div className={styles.navLeft}>
          <Image
            src="/WIT-logo-white.png"
            alt="UNSWWIT Logo"
            className={styles.logo}
            width={50}
            height={50}
            priority
          />
          <li>
            <strong>E M P O W E R M E N T</strong>
          </li>
        </div>
        <div className={styles.navRight}>
          <li><a href="#About">About</a></li>
          <li><a href="#Timeline">Timeline</a></li>
          <li><a href="#Testimonials">Testimonials</a></li>
          <button className={styles.navButton}>
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc6IwF0yrpmglANWJ4ski-zrsfFMtdtpVkzqTTgVGxbPjKo4A/viewform"
            >
              Register Now
            </a>
          </button>
        </div>
      </ul>
    </nav>
  );
}
