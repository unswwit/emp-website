import React, { useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import styles from '../../styles/User.module.css';
import Navbar from '../../components/NavBar';
import MainContent from '../../components/MainContent';
import { Button } from '@mui/material';
import { Flex } from '@mantine/core';
import { getAuthToken } from '../api/session';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';

const montserrat = Montserrat({ subsets: ['latin'] });
// const monsterratBold = Montserrat({ weight: '700', subsets: ['latin'] });

// TODO: to be updated with actual data
const dummyUser1 = {
  zid: 'z1231234',
  firstname: 'Bob',
  lastname: 'Bobbob',
  email: 'some@email.com',
  mentor: 'Po po',
  year: [2021, 2023, 2024],
};

const dummyUser2 = {
  zid: 'z3213211',
  firstname: 'Chicken',
  lastname: 'Nugget',
  email: 'chicken@nugget.com',
  mentor: undefined,
  year: [],
};

export default function UserHome() {
  const router = useRouter();

  useEffect(() => {
    checkAuth(router);
  }, []);

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <Navbar />
        <MainContent>
          <div className={styles.section}>
            <h1>Hi {dummyUser1.firstname} 👋!</h1>
            {!dummyUser1.mentor ? (
              <>
                <p>You have no mentor...</p>
                <Button variant="contained">Look for a Mentor</Button>
              </>
            ) : (
              <>
                <p>Mentor: {dummyUser1.mentor}</p>
                <p>Period: {dummyUser1.year.at(-1)}</p>
                <Flex gap="xs" align="center" mt="xs">
                  <h2>Logged Hours</h2>
                  <Button variant="contained">Add</Button>
                </Flex>
                <p>No activity yet...</p>
              </>
            )}
          </div>
        </MainContent>
      </main>
    </div>
  );
}
