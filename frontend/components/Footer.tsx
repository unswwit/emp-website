import styles from '../styles/Home.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Brand col */}
        <div>
          <a href="#" className={styles.footerLogoText}>
            <span className={styles.footerLogoAccent}>&ldquo;</span>&#123;wit&#125;
          </a>
          <p className={styles.footerTagline}>UNSW Women in Technology</p>
          <p className={styles.footerCopyright}>© {year} · Arc Affiliated Club</p>
        </div>

        {/* Program links */}
        <div>
          <div className={styles.footerColTitle}>Program</div>
          <a href="#about" className={styles.footerLink}>About</a>
          <a
            href="https://www.facebook.com/events/545237864225826"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Apply
          </a>
          <a href="#program" className={styles.footerLink}>FAQ</a>
          <a href="#mentors" className={styles.footerLink}>Mentor signup</a>
        </div>

        {/* Connect links */}
        <div>
          <div className={styles.footerColTitle}>Connect</div>
          <a
            href="https://www.instagram.com/wit.unsw/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/unsw.wit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/company/unswwit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            LinkedIn
          </a>
          <a
            href="https://discord.gg/XDr9qmtQ"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Discord
          </a>
        </div>

        {/* Other links */}
        <div>
          <div className={styles.footerColTitle}>Other</div>
          <a
            href="https://unswwit.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Main WIT site
          </a>
          <a
            href="https://unswwit.com/merch"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Merch store
          </a>
          <a href="mailto:partners@unswwit.com" className={styles.footerLink}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
