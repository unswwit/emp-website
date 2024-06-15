import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { AddCircleRounded, RefreshOutlined } from '@mui/icons-material';
import { Button, Divider, Snackbar, Stack } from '@mui/material';
import styles from '../../styles/User.module.css';

import MainContent from '../../components/MainContent';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';
import { hoursInfo, hoursRequest, hoursType } from '../../types/hours';
import { userRoles } from '../../types/user';
import { getMenteeHours, sendMenteeHours } from '../api/mentee';
import { HoursCollapsible } from '../../components/mentee/HoursCollapsible';
import { AddHoursModal } from '../../components/mentee/AddHoursModal';
import MenteeNavbar from '../../components/MenteeNavbar';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function MenteeHome() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [hoursList, setHoursList] = useState({} as hoursInfo[]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isAddNotifyOpen, setAddNotifyOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleAddNotifyOpen = () => setAddNotifyOpen(true);
  const handleAddNotifyClose = () => setAddNotifyOpen(false);

  const handleAddRequest = (menteeHours: hoursRequest) => {
    sendMenteeHours(menteeHours).then((message: string) => {
      setToastMessage(message);
      handleAddNotifyOpen();
      handleRefresh();
      handleAddModalClose();
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    getMenteeHours().then((res: hoursInfo[]) => {
      setHoursList(res);
      setTimeout(() => setLoading(false), 250);
    });
  };

  useEffect(() => {
    setLoading(true);
    getMenteeHours()
      .catch(() => checkAuth(router, userRoles.MENTEE))
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
            <h1>Hi Name 👋!</h1>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
              marginY={2}
            >
              <Button
                variant="contained"
                startIcon={<AddCircleRounded />}
                onClick={handleAddModalOpen}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshOutlined />}
                onClick={handleRefresh}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </Stack>

            <Stack spacing={2}>
              <HoursCollapsible
                hours={hoursList}
                type={hoursType.LOGGED}
                defaultExpanded={true}
              />
              <HoursCollapsible
                hours={hoursList}
                type={hoursType.REQUESTED}
                defaultExpanded={false}
              />
            </Stack>
          </div>
        </MainContent>

        {/* Modals */}
        <AddHoursModal
          isOpen={isAddModalOpen}
          onAdd={handleAddRequest}
          onClose={handleAddModalClose}
        />

        {/* Toast */}
        <Snackbar
          open={isAddNotifyOpen}
          autoHideDuration={1500}
          onClose={handleAddNotifyClose}
          message={toastMessage}
        />
      </main>
    </div>
  );
}
