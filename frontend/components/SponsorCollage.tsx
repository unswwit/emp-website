import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function SponsorCollage() {
  return (
    <Image
      src="/sponsor-collage-light-mode.png"
      alt="Sponsors"
      className={styles.heroImage}
      width={1100}
      height={800}
      priority
    />
  );
}
