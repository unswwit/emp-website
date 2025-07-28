import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Button, Divider, Snackbar, Stack } from '@mui/material';
import styles from '../../styles/User.module.css';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);

import MainContent from '../../components/MainContent';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useRouter } from 'next/router';

import {
  hoursAdminActions,
  hoursApproveRequest,
  hoursImage,
  hoursInfo,
  hoursStatus,
  groupedHoursEntry,
  cellHookData,
} from '../../types/hours';

import { approveMenteeHours, getAllMenteeHours } from '../api/admin';
import { HoursCollapsible } from '../../components/mentee/HoursCollapsible';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { DownloadOutlined, RefreshOutlined, TimerOutlined } from '@mui/icons-material';
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
      handleRefresh();
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    getAllMenteeHours().then((res: hoursInfo[]) => {
      setHoursList(res);
      setLoading(false);
    });
  };

  const handleDownloadSummary = () => {
    handleRefresh();
    const downloadedHours = hoursList.filter((hour) => hour.status === hoursStatus.APPROVED);

    const groupedHours = downloadedHours.reduce((acc: Record<string, groupedHoursEntry>, info) => {
      if (!acc[info.zid]) {
        acc[info.zid] = {
          firstname: info.firstname,
          lastname: info.lastname,
          totalHours: 0,
          entries: [],
        };
      }

      acc[info.zid].totalHours += info.num_hours;
      acc[info.zid].entries.push({
        timestamp: info.timestamp,
        description: info.description,
        image_url: info.image_url,
      });
      return acc;
    }, {});

    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text(
      `Women in Technology Empowerment Mentoring ${new Date().getFullYear()} Hours Summary Information`,
      14,
      15
    );

    Object.keys(groupedHours).forEach((zid, index) => {
      if (index > 0) {
        doc.addPage();
      }

      const user = groupedHours[zid];

      doc.setFontSize(14);
      doc.text(`ZID: ${zid} - ${user.firstname} ${user.lastname}`, 14, 25);
      doc.setFontSize(12);
      doc.text(`Total Hours: ${user.totalHours}`, 14, 35);

      const tableHeaders = ['Timestamp', 'Description', 'Image'];
      const tableData = user.entries.map((entry) => [
        entry.timestamp,
        entry.description,
        { content: '', link: entry.image_url },
      ]);

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: 45,
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 100 },
          2: { cellWidth: 30 },
        },
        didDrawCell: (data: cellHookData) => {
          if (data.column.index === 2 && typeof data.cell.raw === 'object') {
            doc.textWithLink('View Image', data.cell.x + 2, data.cell.y + 5, {
              url: data.cell.raw.link,
            });
          }
        },
      });
    });

    doc.save(`WIT ${new Date().getFullYear()} Hours Summary Information.pdf`);
  };

  const handleDownload = () => {
    handleRefresh();
    const downloadedHours = hoursList.filter((hour) => hour.status === hoursStatus.APPROVED);

    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(18);
    doc.text(
      `Women in Technology Empowerment Mentoring ${new Date().getFullYear()} All Hours Information`,
      14,
      15
    );

    const tableData = downloadedHours.map((info) => [
      info.zid,
      info.firstname,
      info.lastname,
      info.num_hours,
      info.description,
      info.timestamp,
      { content: '', link: info.image_url },
    ]);

    const tableHeaders = [
      'ZID',
      'First Name',
      'Last Name',
      'Hours',
      'Description',
      'Timestamp',
      'Image URL',
    ];

    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 25,
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15 },
        4: { cellWidth: 60 },
        5: { cellWidth: 40 },
        6: { cellWidth: 50 },
      },
      didDrawCell: (data: cellHookData) => {
        if (data.column.index === 6 && typeof data.cell.raw === 'object') {
          doc.textWithLink('Click to view', data.cell.x + 2, data.cell.y + 5, {
            url: data.cell.raw.link,
          });
        }
      },
    });

    doc.save(`WIT ${new Date().getFullYear()} All Hours Information.pdf`);
  };

  const initHome = async () => {
    const validUser = await checkValidUser(router, true);

    if (!validUser) return;
    setValidUser(true);

    getAllMenteeHours()
      .then((res: hoursInfo[]) => setHoursList(res))
      .finally(() => setLoading(false));
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
            <AdminNavbar onLogout={() => setLoading(true)} />
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
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                  marginY={2}
                >
                  <Button
                    variant="outlined"
                    startIcon={<TimerOutlined />}
                    onClick={() => handleDownload()}
                    disabled={isLoading}
                  >
                    Download All Hours
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={1}
                  marginY={2}
                >
                  <Button
                    variant="outlined"
                    startIcon={<DownloadOutlined />}
                    onClick={() => handleDownloadSummary()}
                    disabled={isLoading}
                  >
                    Download Hours Summary
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <HoursCollapsible
                  title="Open Requests"
                  hours={hoursList}
                  statuses={[hoursStatus.PENDING]}
                  actions={adminActions}
                  onImage={handleImageModalOpen}
                  defaultExpanded
                  viewZid
                  viewFname
                  viewLname
                />
                <HoursCollapsible
                  title="Closed Requests"
                  hours={hoursList}
                  statuses={[hoursStatus.APPROVED, hoursStatus.REJECTED]}
                  onImage={handleImageModalOpen}
                  viewZid
                  viewFname
                  viewLname
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
