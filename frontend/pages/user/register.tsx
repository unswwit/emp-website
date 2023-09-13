import React from 'react';
import { Montserrat } from "next/font/google";
import styles from '../../styles/User.module.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function register() {
  return (
    <div className={styles.user}>
      <main className={montserrat.className}></main>
    </div>
  );
}
