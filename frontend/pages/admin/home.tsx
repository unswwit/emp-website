import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Divider, Stack } from '@mui/material';
import styles from '../../styles/User.module.css';

import MainContent from '../../components/MainContent';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';
import { hoursInfo, hoursStatus } from '../../types/hours';
import { userRoles } from '../../types/user';
import { getAllMenteeHours } from '../api/admin';
import { HoursCollapsible } from '../../components/mentee/HoursCollapsible';
import MenteeNavbar from '../../components/MenteeNavbar';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function AdminHome() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [hoursList, setHoursList] = useState({} as hoursInfo[]);

  useEffect(() => {
    setLoading(true);
    getAllMenteeHours()
      .catch(() => checkAuth(router, userRoles.ADMIN))
      .then((res: hoursInfo[]) => setHoursList(res))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <LoadingOverlay isLoading={isLoading} />
        <MenteeNavbar />
        <MainContent>
          <div className={styles.section}>
            <h1>Hi Admin 👋!</h1>
          </div>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
            marginY={2}
          >
            {/* put some stuff here later */}
          </Stack>

          <Stack spacing={2}>
            <HoursCollapsible
              title="Open Requests"
              hours={hoursList}
              statuses={[hoursStatus.PENDING]}
              defaultExpanded={true}
              actions
            />
            <HoursCollapsible
              title="Closed Requests"
              hours={hoursList}
              statuses={[hoursStatus.APPROVED, hoursStatus.REJECTED]}
              defaultExpanded={false}
            />
          </Stack>
        </MainContent>
      </main>
    </div>
  );
}
