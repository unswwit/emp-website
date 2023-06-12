import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';


export default function Footer() {
  return (
    <><div className={styles.divider}>
      <div className={styles.flex}>
        <Image
          src="/WIT-logo-white.png"
          alt="UNSWWIT Logo"
          className={styles.footerLogo}
          width={50}
          height={50}
          priority />
        <p>© UNSW Women in Technology 2023</p>
        <button className={styles.footerButton}>Register Now</button>
      </div>
      <div className={styles.footerIcons}>
        <div><SocialIcon url="https://www.instagram.com/wit.unsw/?hl=en" network="instagram" /></div>
        <div><SocialIcon url="https://www.facebook.com/unsw.wit" network="facebook" /></div>
        <div><SocialIcon url="https://discord.gg/XDr9qmtQ" network="discord" /></div>
      </div>
    </div></>
  );
}
