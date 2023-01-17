import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
          <li>About</li>
          <li>Timeline</li>
          <li>Mentors</li>
          <button className={styles.navButton}>Register Now</button>
        </div>
      </ul>
    </nav>
  )
}