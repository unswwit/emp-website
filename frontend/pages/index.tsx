import Head from 'next/head';
import { Montserrat } from 'next/font/google';
import styles from '../styles/Home.module.css';
import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ReviewHours from '../components/ReviewHours';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>WIT Empowerment Mentoring</title>
        <meta
          name="description"
          content="women in technology empowerment website"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/WIT-logo-black.png" />
      </Head>
      <main className={montserrat.className}>
        <Navbar />
        <div id="About" className={styles.section}>
          <ReviewHours />
        </div>
        <Footer />
      </main>
    </div>
  );
}