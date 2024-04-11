import Head from 'next/head';
import { Montserrat } from 'next/font/google';
import styles from '../styles/Home.module.css';
import React from 'react';
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import SponsorCollage from '../components/SponsorCollage';
import Timeline from '../components/Timeline';
// import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { filterSponsors } from '../lib/helpers/sponsor';
import { ITypeSponsorsFields, TypeSponsorsSkeleton } from '../types/sponsors';
import ContentService from '../lib/api';
import { GetStaticProps } from 'next';

type Sponsors = {
  sponsors: ITypeSponsorsFields[];
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home({ sponsors }: Sponsors) {
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
        <Hero />
        <Countdown />
        <div id="About" className={styles.section}>
          <h1>EMPOWERMENT MENTORING</h1>
          <p>
            WIT's Empowerment Mentoring Program, run over Term 2 and 3, offers a
            unique opportunity for students to enhance their skills and connect
            with industry professionals. Prepare to level up your interview
            skills, master technical interviews, and strengthen your
            communication, teamwork, and leadership abilities.
          </p>
          <p>
            As a mentee, you'll be paired with an experienced industry mentor
            who will provide personalized guidance on starting your professional
            career. With a wide range of mentor companies, you'll gain exposure
            to diverse professional environments and expand your professional
            network. By completing the program, you'll also earn AHEGS
            accreditation, a recognised achievement by UNSW that showcases your
            commitment to ongoing growth and development.
          </p>
          <p>
            Don't miss this opportunity to empower yourself and thrive in the
            world of technology!
          </p>
          <div className={styles.wrapper}>
              <a
                target="_blank"
                href="https://www.facebook.com/events/545237864225826"
              >
                <button className={styles.button}>
                  Learn More
                </button>
            </a>
          </div>
        </div>
        {/* <div id="Testimonials" className={styles.graySection}>
          <h1>TESTIMONIALS</h1>
          <Testimonials />
        </div> */}
        <div className={styles.divider}>
          <h2>Sign up to the reminder list here:</h2>
            <a
              target="_blank"
              href="https://www.facebook.com/events/545237864225826"
            >
            <button className={styles.button}>
            Remind me
          </button>
          </a>
        </div>
        <div id="Timeline" className={styles.section}>
          <h1>TIMELINE</h1>
          <Timeline />
        </div>
        <div className={styles.divider}>
          <h2>Mentor list will be released soon...</h2>
        </div>
        <div className={styles.section}>
          <h1>SPONSORS AND AFFILIATIONS</h1>
          <div className={styles.wrapper}>
            <SponsorCollage tempSponsors={sponsors} />
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const s = (
    await ContentService.instance.getEntriesByType<TypeSponsorsSkeleton>(
      'sponsors'
    )
  ).map((s) => s.fields);
  const sponsors = filterSponsors(s);
  return {
    props: {
      sponsors,
    },
  };
};
