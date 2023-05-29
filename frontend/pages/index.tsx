import Head from 'next/head';
import { Montserrat } from '@next/font/google';
import styles from '../styles/Home.module.css';
import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import SponsorCollage from '../components/SponsorCollage';
import Timeline from '../components/Timeline';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>WIT Empowerment Mentoring</title>
        <meta name="description" content="women in technology empowerment website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/WIT-logo-black.png" />
      </Head>
      <main className={montserrat.className}>
        <NavBar />
        <Hero />
        <Countdown />
        <div className={styles.section}>
          <h1>EMPOWERMENT MENTORING</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <div className={styles.wrapper}>
          <button className={styles.button}><a target="_blank" href="https://www.facebook.com/events/545237864225826">Learn More</a></button>
          </div>
        </div>
        <div className={styles.graySection}>
          <h1>TESTIMONIALS</h1>
          <Testimonials />
        </div>
        <div className={styles.divider}>
          <h2>Sign up to the reminder list here:</h2>
          <button className={styles.button}><a target="_blank" href="https://www.facebook.com/events/545237864225826">Remind me</a></button>
        </div>
        <div className={styles.section}>
          <h1>TIMELINE</h1>
          <Timeline />
        </div>
        <div className={styles.divider}>
          <h2>Mentor list will be released soon...</h2>
        </div>
        <div className={styles.section}>
          <h1>SPONSORS AND AFFILIATIONS</h1>
          <div className={styles.wrapper}>
            <SponsorCollage />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
