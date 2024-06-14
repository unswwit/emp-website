import styles from '../styles/User.module.css';

// eslint-disable-next-line
export default function MainContent({ children }: { children: any }) {
  return <div className={styles.mainContent}>{children}</div>;
}
