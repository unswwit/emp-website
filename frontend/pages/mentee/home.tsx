import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import styles from '../../styles/User.module.css';
import Navbar from '../../components/NavBar';
import MainContent from '../../components/MainContent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Modal,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
// import { getMenteeInfo } from '../api/mentee';
import {
  AddCircleRounded,
  ExpandMoreOutlined,
  RefreshOutlined,
} from '@mui/icons-material';
import { hoursInfo, hoursStatus, hoursType } from '../../types/hours';
import { userRoles } from '../../types/user';
import { getMenteeHours } from '../api/mentee';

const montserrat = Montserrat({ subsets: ['latin'] });

const HoursTable = ({ hours }: { hours: hoursInfo[] }) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hours?.map((h, k) => {
            return (
              <TableRow key={k}>
                <TableCell>{h.timestamp}</TableCell>
                <TableCell>{h.num_hours}</TableCell>
                <TableCell>{h.description}</TableCell>
                <TableCell>
                  <Chip
                    sx={{ textTransform: 'uppercase' }}
                    label={h.status}
                    color={mapStatusColor(h.status)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const HoursCollapsible = ({
  hours,
  type,
  defaultExpanded,
}: {
  hours: hoursInfo[];
  type: hoursType;
  defaultExpanded: boolean;
}) => {
  const [filteredHours, setFilteredHours] = useState([] as hoursInfo[]);

  useEffect(() => {
    if (type === hoursType.LOGGED)
      setFilteredHours(hours?.filter((h) => h.status === hoursStatus.APPROVED));
    else if (type === hoursType.REQUESTED)
      setFilteredHours(hours?.filter((h) => h.status !== hoursStatus.APPROVED));
  }, []);

  return (
    <div>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <h3>{type === hoursType.LOGGED ? 'Logged Hours' : 'Requested'}</h3>
        </AccordionSummary>
        <AccordionDetails>
          {filteredHours.length > 0 ? (
            <HoursTable hours={filteredHours} />
          ) : (
            'Nothing to see here.'
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const AddHoursModal = ({
  isOpen,
  onAdd,
  onClose,
}: {
  isOpen: boolean;
  onAdd: () => void;
  onClose: () => void;
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Hours Request
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Please convert your minutes to hours.
          </Typography>
          <Typography sx={{ mb: 2, mt: 1 }}>
            e.g., 45 minutes is 0.75, 30 minutes is 0.5, 15 minutes is 0.25.
          </Typography>
          <Stack sx={{ mb: 2 }} spacing={1}>
            <TextField
              id="hours-input"
              label="Hours"
              variant="outlined"
              required
            />
            <TextField
              id="description-input"
              label="Description"
              variant="outlined"
              rows={2}
              multiline
              required
            />
          </Stack>
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onAdd}>
              Send Request
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

const mapStatusColor = (status: hoursStatus) => {
  switch (status) {
    case hoursStatus.APPROVED:
      return 'success';
    case hoursStatus.PENDING:
      return 'primary';
    case hoursStatus.REJECTED:
      return 'error';
    default:
      return 'primary';
  }
};

export default function MenteeHome() {
  const router = useRouter();

  const [isLoading, setLoading] = React.useState(true);
  const [hoursList, setHoursList] = useState({} as hoursInfo[]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isAddNotifyOpen, setAddNotifyOpen] = useState(false);

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleAddNotifyOpen = () => setAddNotifyOpen(true);
  const handleAddNotifyClose = () => setAddNotifyOpen(false);

  const handleAddRequest = () => {
    handleAddNotifyOpen();
    handleRefresh();
    handleAddModalClose();
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      getMenteeHours().then((res: hoursInfo[]) => {
        setHoursList(res);
        setLoading(false);
      });
    }, 250);
  };

  useEffect(() => {
    setLoading(true);
    checkAuth(router, userRoles.MENTEE);
    getMenteeHours().then((res: hoursInfo[]) => {
      setHoursList(res);
    });
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className={styles.userHome}>
      <main className={montserrat.className}>
        <LoadingOverlay isLoading={isLoading} />
        <Navbar />
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
          message="Hours request sent!"
        />
      </main>
    </div>
  );
}
