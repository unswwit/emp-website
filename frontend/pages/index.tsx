import Head from 'next/head'
import Image from 'next/image'
import { Montserrat } from '@next/font/google'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={montserrat.className}>
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
            </div>
          </ul>
        </nav>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>UNSW <br></br> Women in Technology</h1>
          <h3>2023 Empowerment<br></br> Mentoring</h3>
        </div>
        <Image
          src="/hero.png"
          alt="Empowerment Mentoring"
          className={styles.heroImage}
          width={750}
          height={550}
          priority
        />
      </div>
      <div className={styles.divider}>
        <p><strong>Sign ups open in:</strong></p>
        <h2>3 weeks, 2 days, 5 hours</h2>
      </div>
      <div className={styles.section}>
        <h1>EMPOWERMENT MENTORING</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </p>
        <div className={styles.wrapper}>
          <button className={styles.button}>Learn More</button>
        </div>
      </div>
      <div className={styles.graySection}>
        <h1>TESTIMONIALS</h1>
        <div className={styles.wrapper}>
          <Image
            src="/testimonials.png"
            alt="testimonials"
            className={styles.heroImage}
            width={1100}
            height={550}
            priority
          />
        </div>
      </div>
      <div className={styles.divider}>
        <h2>Sign up to the reminder list here:</h2>
        <button className={styles.button}>Remind me</button>
      </div>
      <div className={styles.section}>
        <h1>TIMELINE</h1>
        <div className={styles.wrapper}>
          <Image
            src="/timeline.png"
            alt="Timeline"
            className={styles.heroImage}
            width={1100}
            height={130}
            priority
          />
        </div>
      </div>
      <div className={styles.divider}>
        <h2>Mentor list will be released soon...</h2>
      </div>
      <div className={styles.section}>
        <h1>SPONSORS AND AFFILIATIONS</h1>
        <div className={styles.wrapper}>
          <Image
              src="/sponsor-collage-light-mode.png"
              alt="Sponsors"
              className={styles.heroImage}
              width={1100}
              height={800}
              priority
            />
          </div>
      </div>
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
          <p>©  UNSW Women in Technology 2023</p>
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
      </main>
    </div>
  )
}
