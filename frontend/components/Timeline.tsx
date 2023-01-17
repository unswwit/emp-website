import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Timeline() {
  return (
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
  )
}