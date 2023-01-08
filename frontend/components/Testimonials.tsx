import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Testimonials() {
    return (
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
    )
  }