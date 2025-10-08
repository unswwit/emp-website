import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { AddCircleRounded, RefreshOutlined } from '@mui/icons-material';
import { Button, Divider, Snackbar, Stack } from '@mui/material';
import styles from '../../styles/User.module.css';

import MainContent from '../../components/MainContent';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useRouter } from 'next/router';
import { hoursImage, hoursInfo, hoursRequest, hoursStatus } from '../../types/hours';
import { userProfile } from '../../types/user';
import { getMenteeHours, sendMenteeHours } from '../api/mentee';

import ProgressTracker from '../../components/mentee/ProgressTracker';
import { HoursCollapsible } from '../../components/mentee/HoursCollapsible';
import { AddHoursModal } from '../../components/mentee/AddHoursModal';
import MenteeNavbar from '../../components/mentee/MenteeNavbar';
import { ViewImageModal } from '../../components/mentee/ViewImageModal';
import { checkValidUser } from '../../utils/auth';
import { getUserProfile } from '../api/user';
import { editMenteeHours } from '../api/mentee';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function MenteeHome() {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [modalInitialData, setModalInitialData] = useState<{
    id: string;
    numHours: number;
    description: string;
    imageUrl: string;
  } | undefined>(undefined);

  const [isLoading, setLoading] = useState(true);
  const [isValidUser, setValidUser] = useState(false);
  const [isAddNotifyOpen, setAddNotifyOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const [hoursList, setHoursList] = useState({} as hoursInfo[]);
  const [selectedImage, setSelectedImage] = useState({ imageSrc: '', imageAlt: '' } as hoursImage);
  const [toastMessage, setToastMessage] = useState('');
  const [userInfo, setUserInfo] = useState({} as userProfile);


  const handleAddModalOpen = () => {
    setModalMode('add');
    setModalInitialData(undefined);
    setModalOpen(true);
  };

  const handleAddModalClose = () => {
    setModalOpen(false);
  };

  const handleRowClick = (log: hoursInfo) => {
    if (log.status === hoursStatus.PENDING) {
      setModalMode('edit');
      setModalInitialData({
        id: log.id,
        numHours: log.num_hours,
        description: log.description,
        imageUrl: log.image_url,
      });
      setModalOpen(true);
    }
  };

  const handleImageModalOpen = ({ imageSrc, imageAlt }: hoursImage) => {
    setSelectedImage({ imageSrc, imageAlt });
    setImageModalOpen(true);
  };
  const handleImageModalClose = () => setImageModalOpen(false);

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
      setLoading(false);
    });
  };

  const initHome = async () => {
    const validUser = await checkValidUser(router, true);

    if (!validUser) return;
    setValidUser(true);

    Promise.all([getUserProfile(), getMenteeHours()])
      .then(([userRes, hoursRes]) => {
        setUserInfo(userRes);
        setHoursList(hoursRes);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    initHome();
  }, []);

  const handleEdit = async (id: string, editedData: hoursRequest) => {
    try {
      await editMenteeHours(id, editedData);
      await handleRefresh();
      setModalOpen(false);
    } catch (err) {
      console.error('Edit failed:', err);
    }
  };

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <LoadingOverlay isLoading={isLoading} isRedirecting={!isValidUser} />
        {!isValidUser ? (
          <></>
        ) : (
          <>
            <MenteeNavbar onLogout={() => setLoading(true)} />
            <MainContent>
              <div className={styles.section}>
                <h1>Hi {userInfo['firstname'] ?? 'there'} 👋!</h1>
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
                  <ProgressTracker hours={hoursList} statuses={[hoursStatus.APPROVED]} />
                  <HoursCollapsible
                    title="Logged Hours"
                    hours={hoursList}
                    statuses={[hoursStatus.APPROVED]}
                    onImage={handleImageModalOpen}
                    defaultExpanded
                  />
                  <HoursCollapsible
                    title="Requested"
                    hours={hoursList}
                    statuses={[hoursStatus.PENDING, hoursStatus.REJECTED]}
                    onImage={handleImageModalOpen}
                    onRowClick={handleRowClick}
                  />
                </Stack>
              </div>
            </MainContent>

            {/* Modals */}
            <AddHoursModal
              isOpen={modalOpen}
              mode={modalMode}
              initialData={modalInitialData}
              onAdd={handleAddRequest}
              onEdit={handleEdit}
              onClose={handleAddModalClose}
            />
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
