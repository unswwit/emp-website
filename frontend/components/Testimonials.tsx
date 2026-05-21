import styles from '../styles/Home.module.css';
import { ExecQuote } from '../types/execQuotes';

export default function Testimonials({ quotes }: { quotes: ExecQuote[] }) {
  const featured = quotes[0];
  const side = quotes.slice(1);

  if (!featured) return null;

  return (
    <div className={styles.cohortLayout}>
      {/* Left: big pull quote */}
      <div>
        <span className={styles.openQuote}>&ldquo;</span>
        <p className={styles.pullQuoteText}>{featured.quote}</p>
        <div className={styles.pullAuthor}>
          <div className={styles.pullPhoto}>
            {featured.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={featured.imageUrl} alt={featured.name} />
            )}
          </div>
          <div>
            <div className={styles.pullName}>{featured.name}</div>
            <div className={styles.pullRole}>{featured.position}</div>
          </div>
        </div>
      </div>

      {/* Right: remaining quotes */}
      <div className={styles.sideQuotes}>
        {side.map((q, i) => (
          <div key={i} className={styles.sideQuote}>
            <p className={styles.sideQuoteText}>{q.quote}</p>
            <div className={styles.pullAuthor}>
              <div className={styles.pullPhoto}>
                {q.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={q.imageUrl} alt={q.name} />
                )}
              </div>
              <div>
                <div className={styles.sideQuoteName}>{q.name}</div>
                <div className={styles.sideQuoteRole}>{q.position}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
