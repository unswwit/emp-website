/* eslint-disable */
import React from 'react';
import styles from '../styles/Home.module.css';

export default function SponsorCollage({ tempSponsors }: any) {
  const allSponsors: any[] = Object.values(tempSponsors).flat();

  if (allSponsors.length === 0) {
    return (
      <div className={styles.partnerGrid}>
        <span className={styles.partnerName} style={{ opacity: 0.4, padding: '0.5rem' }}>
          Partner logos coming soon
        </span>
      </div>
    );
  }

  return (
    <div className={styles.partnerGrid}>
      {allSponsors.map((sponsor: any, index: number) => (
        <a
          key={index}
          href={sponsor.website || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerPill}
        >
          {sponsor.lightModeLogo?.fields?.file?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={'https:' + sponsor.lightModeLogo.fields.file.url}
              alt={sponsor.name || 'sponsor'}
              className={styles.partnerLogoImg}
            />
          ) : (
            <span className={styles.partnerName}>{sponsor.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
