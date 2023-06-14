import React from 'react';
import Image from 'next/legacy/image';
import styles from '../styles/SponsorCollage.module.css';
import { loadSponsors } from '../lib/helpers/api';

const SponsorCollage = ({ tempSponsors }: any) => {
  return (
    <div className={styles.sponsors}>
      <div className={styles.collageContainer}>
        {Object.keys(tempSponsors).map((sponsorType, index) => (
          <div key={index} className={styles.rowContainer}>
            {tempSponsors[sponsorType].map((sponsor: any, index: any) => (
              <div key={index} className={styles.logoContainer}>
                <Image
                  className={styles.logo}
                  src={
                    window.matchMedia &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'https:' + sponsor.fields.darkModeLogo.fields.file.url
                      : 'https:' + sponsor.fields.lightModeLogo.fields.file.url
                  }
                  alt={'sponsor logo'}
                  width="100"
                  height="100"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const sponsors = await loadSponsors();
  return {
    props: { sponsors },
    revalidate: revalidate
  };
}

export default SponsorCollage;
