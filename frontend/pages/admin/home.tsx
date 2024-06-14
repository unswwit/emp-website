import React, { useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import styles from '../../styles/User.module.css';
import Navbar from '../../components/NavBar';
import MainContent from '../../components/MainContent';
import { Button } from '@mui/material';
import { Flex } from '@mantine/core';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';
import LoadingOverlay from '../../components/LoadingOverlay';

const montserrat = Montserrat({ subsets: ['latin'] });
// const monsterratBold = Montserrat({ weight: '700', subsets: ['latin'] });

export default function AdminHome() {
  const router = useRouter();

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    checkAuth(router);
    setInterval(() => setLoading(false), 1000);
  }, []);

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <LoadingOverlay isLoading={isLoading} />
        <Navbar />
        <MainContent>
          <div className={styles.section}>
            <h1>Hi Admin 👋!</h1>
          </div>
        </MainContent>
      </main>
    </div>
  );
}
