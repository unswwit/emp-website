import Head from 'next/head';
import { Montserrat } from 'next/font/google';
import styles from '../styles/Home.module.css';
import React from 'react';
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import StayInTheLoop from '../components/Countdown';
import SponsorCollage from '../components/SponsorCollage';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { filterSponsors } from '../lib/helpers/sponsor';
import { ITypeSponsorsFields, TypeSponsorsSkeleton } from '../types/sponsors';
import { ExecQuote, ExecQuotesSkeleton } from '../types/execQuotes';
import ContentService from '../lib/api';
import { GetStaticProps } from 'next';

type Props = {
  sponsors: ITypeSponsorsFields[];
  empQuotes: ExecQuote[];
};

const montserrat = Montserrat({ subsets: ['latin'] });

export default function Home({ sponsors, empQuotes }: Props) {
  const year = new Date().getFullYear();

  return (
    <div className={styles.home}>
      <Head>
        <title>WIT Empowerment Mentoring {year}</title>
        <meta name="description" content="UNSW Women in Technology Empowerment Mentoring Program" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/WIT-logo-black.png" />
      </Head>

      <main className={montserrat.className}>
        <Navbar />

        {/* Hero */}
        <Hero />

        {/* Stats bar */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Format</div>
            <div className={styles.statValue}>Two-term, 1:1 mentoring</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Terms</div>
            <div className={styles.statValue}>Term 2 + Term 3</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Credit</div>
            <div className={styles.statValue}>AHEGS accredited</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Skills</div>
            <div className={styles.statValue}>Interviews · Tech · Leadership</div>
          </div>
        </div>

        {/* 01 - The Program */}
        <section id="program" className={styles.programSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>01</span>
            <span className={styles.sectionLabelDash} />
            <span>The Program</span>
          </div>
          <div className={styles.programLayout}>
            <div>
              <h2 className={styles.programHeadline}>
                One mentor. Two terms. A direct line into the tech industry.
              </h2>
            </div>
            <div>
              <p className={styles.programText}>
                Run across Term 2 and Term 3, the Empowerment Mentoring Program pairs each student
                with an experienced industry mentor. Mentees meet their mentor fortnightly across the
                two terms and join the wider cohort for four workshops on technical interviews,
                communication, teamwork and leadership.
              </p>
              <p className={styles.programText}>
                The program is open to UNSW women and gender-diverse students. Completion earns
                AHEGS accreditation on your UNSW transcript - a record of professional development
                you can carry forward.
              </p>
            </div>
          </div>
        </section>

        {/* 02 - How It Works */}
        <section id="how-it-works" className={styles.howSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>02</span>
            <span className={styles.sectionLabelDash} />
            <span>How It Works</span>
          </div>
          <div className={styles.stepsGrid}>
            <div>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepTitle}>Apply</div>
              <div className={styles.stepTime}>Term 1</div>
              <p className={styles.stepDesc}>Submit a short application.</p>
            </div>
            <div>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepTitle}>Match</div>
              <div className={styles.stepTime}>Early Term 2</div>
              <p className={styles.stepDesc}>Paired with an industry mentor.</p>
            </div>
            <div>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepTitle}>Mentor</div>
              <div className={styles.stepTime}>Term 2 → Term 3</div>
              <p className={styles.stepDesc}>Fortnightly 1:1s + four cohort workshops.</p>
            </div>
            <div>
              <div className={styles.stepNum}>04</div>
              <div className={styles.stepTitle}>Carry</div>
              <div className={styles.stepTime}>End of Term 3</div>
              <p className={styles.stepDesc}>Closing ceremony, AHEGS credit, alumni network.</p>
            </div>
          </div>
        </section>

        {/* 03 - From the Cohort */}
        <section id="cohort" className={styles.cohortSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>03</span>
            <span className={styles.sectionLabelDash} />
            <span>From the Cohort</span>
          </div>
          <Testimonials quotes={empQuotes} />
        </section>

        {/* 04 - Key Dates */}
        <section id="timeline" className={styles.timelineSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>04</span>
            <span className={styles.sectionLabelDash} />
            <span>Key Dates</span>
          </div>
          <h2 className={styles.timelineHeadline}>The program at a glance.</h2>
          <div className={styles.timelineList}>
            {[
              { date: '5 May',              label: 'Mentee Applications Open' },
              { date: '19 May',             label: 'Applications Close' },
              { date: '20 – 29 May',        label: 'Mentee Interviews' },
              { date: '2 June',             label: 'Mentee Training Workshop', tentative: true },
              { date: '10 June',            label: 'Opening Ceremony',         tentative: true },
              { date: '2 July',             label: 'Paint & Sip Social Event', tentative: true },
              { date: '15 July',            label: 'Workshop 1 - Resume & Personal Branding', tentative: true },
              { date: '22 September',       label: 'Workshop 2 - Mock Assessment Centre',    tentative: true },
              { date: '16 October',         label: 'Closing Ceremony',         tentative: true },
            ].map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDate}>{item.date}</div>
                <div className={styles.timelineConnector}>
                  <div className={styles.timelineDot} />
                  {i < 8 && <div className={styles.timelineTrack} />}
                </div>
                <div className={styles.timelineBody}>
                  <span className={styles.timelineLabel}>{item.label}</span>
                  {item.tentative && <span className={styles.timelineTentative}>tentative</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 — Partners & Affiliations */}
        <section id="partners" className={styles.partnersSection}>
          <div className={styles.sectionLabel}>
            <span className={styles.sectionLabelNum}>05</span>
            <span className={styles.sectionLabelDash} />
            <span>Partners &amp; Affiliations</span>
          </div>
          <h2 className={styles.partnersHeadline}>Trusted by Sydney&rsquo;s leading firms.</h2>
          <SponsorCollage tempSponsors={sponsors} />
        </section>

        {/* 06 — Stay in the Loop */}
        <StayInTheLoop />

        <Footer />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const s = (await ContentService.instance.getEntriesByType<TypeSponsorsSkeleton>('sponsors')).map(
    (s) => s.fields
  );
  const sponsors = filterSponsors(s);

  const rawQuotes = await ContentService.instance.getEntriesByType<ExecQuotesSkeleton>('execQuotes');
  const empQuotes = rawQuotes
    .filter((e) => e.fields.index >= 10 && e.fields.index <= 13)
    .sort((a, b) => a.fields.index - b.fields.index)
    .map((e) => ({
      index: e.fields.index as number,
      name: e.fields.name as string,
      position: e.fields.position as string,
      quote: e.fields.quote as string,
      imageUrl: (e.fields.image as any)?.fields?.file?.url
        ? 'https:' + (e.fields.image as any).fields.file.url
        : null,
    }));

  return {
    props: {
      sponsors,
      empQuotes,
    },
  };
};
