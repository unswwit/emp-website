import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Button, Divider, Snackbar, Stack } from '@mui/material';
import styles from '../../styles/User.module.css';

import MainContent from '../../components/MainContent';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useRouter } from 'next/router';

import {
  hoursAdminActions,
  hoursApproveRequest,
  hoursImage,
  hoursInfo,
  hoursStatus,
} from '../../types/hours';

import { approveMenteeHours, getAllMenteeHours } from '../api/admin';
import { HoursCollapsible } from '../../components/mentee/HoursCollapsible';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { RefreshOutlined } from '@mui/icons-material';
import { ViewImageModal } from '../../components/mentee/ViewImageModal';
import { checkValidUser } from '../../utils/auth';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function AdminHome() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isValidUser, setValidUser] = useState(false);
  const [isAddNotifyOpen, setAddNotifyOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const [hoursList, setHoursList] = useState({} as hoursInfo[]);
  const [selectedImage, setSelectedImage] = useState({ imageSrc: '', imageAlt: '' } as hoursImage);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddNotifyOpen = () => setAddNotifyOpen(true);
  const handleAddNotifyClose = () => setAddNotifyOpen(false);

  const handleImageModalOpen = ({ imageSrc, imageAlt }: hoursImage) => {
    setSelectedImage({ imageSrc, imageAlt });
    setImageModalOpen(true);
  };
  const handleImageModalClose = () => setImageModalOpen(false);

  const handleApproveRequest = (menteeHours: hoursApproveRequest) => {
    approveMenteeHours(menteeHours).then((message: string) => {
      setToastMessage(message);
      handleAddNotifyOpen();
      handleRefresh(false);
    });
  };

  const handleRefresh = (delay = true) => {
    setLoading(true);
    getAllMenteeHours().then((res: hoursInfo[]) => {
      setHoursList(res);
      setTimeout(() => setLoading(false), delay ? 250 : 0);
    });
  };

  const initHome = async () => {
    const validUser = await checkValidUser(router, true);

    if (!validUser) return;
    setValidUser(true);

    getAllMenteeHours()
      .then((res: hoursInfo[]) => setHoursList(res))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  };

  const adminActions = {
    approveAction: (id: string) =>
      handleApproveRequest({ hourId: id, status: hoursStatus.APPROVED }),
    rejectAction: (id: string) =>
      handleApproveRequest({ hourId: id, status: hoursStatus.REJECTED }),
  } as hoursAdminActions;

  useEffect(() => {
    setLoading(true);
    initHome();
  }, []);

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <LoadingOverlay isLoading={isLoading} isRedirecting={!isValidUser} />
        {!isValidUser ? (
          <></>
        ) : (
          <>
            <AdminNavbar />
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
                <Button
                  variant="outlined"
                  startIcon={<RefreshOutlined />}
                  onClick={() => handleRefresh()}
                  disabled={isLoading}
                >
                  Refresh
                </Button>
              </Stack>

              <Stack spacing={2}>
                <HoursCollapsible
                  title="Open Requests"
                  hours={hoursList}
                  statuses={[hoursStatus.PENDING]}
                  defaultExpanded={true}
                  actions={adminActions}
                  onImage={handleImageModalOpen}
                />
                <HoursCollapsible
                  title="Closed Requests"
                  hours={hoursList}
                  statuses={[hoursStatus.APPROVED, hoursStatus.REJECTED]}
                  defaultExpanded={false}
                  onImage={handleImageModalOpen}
                />
              </Stack>
            </MainContent>

            {/* Modals */}
            <ViewImageModal
              isOpen={isImageModalOpen}
              onClose={handleImageModalClose}
              image={selectedImage}
            />

            {/* Toasts */}
            <Snackbar
              open={isAddNotifyOpen}
              autoHideDuration={1500}
              onClose={handleAddNotifyClose}
              message={toastMessage}
            />
          </>
        )}
      </main>
    </div>
  );
}
