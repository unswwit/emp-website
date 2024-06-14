import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import styles from '../../styles/User.module.css';
import Navbar from '../../components/NavBar';
import MainContent from '../../components/MainContent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { checkAuth } from '../../utils/auth';
import LoadingOverlay from '../../components/LoadingOverlay';
// import { getMenteeInfo } from '../api/mentee';
import { ExpandMoreOutlined } from '@mui/icons-material';

const montserrat = Montserrat({ subsets: ['latin'] });

// TODO: to be updated with actual data
interface hoursData {
  data: hoursInfo[];
}

interface hoursInfo {
  id: string;
  zid: string;
  timestamp: string;
  num_hours: number;
  description: string;
  status: hoursStatus;
  image_url: string;
}

enum hoursStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

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

const HoursTable = ({ hours, type }: { hours: hoursData; type: string }) => {
  const [filteredHours, setFilteredHours] = useState([] as hoursInfo[]);

  useEffect(() => {
    if (type === 'logged')
      setFilteredHours(
        hours.data?.filter((h) => h.status === hoursStatus.APPROVED)
      );
    else if (type === 'requested')
      setFilteredHours(
        hours.data?.filter((h) => h.status !== hoursStatus.APPROVED)
      );
  }, []);

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
          {filteredHours?.map((h) => {
            return (
              <TableRow>
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
  hours: hoursData;
  type: string;
  defaultExpanded: boolean;
}) => {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <h3>{type === 'logged' ? 'Logged Hours' : 'Requested'}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <HoursTable hours={hours} type={type} />
      </AccordionDetails>
    </Accordion>
  );
};

const hoursInitList = {
  data: [
    {
      id: '1',
      zid: 'z1231234',
      timestamp: '01/01/2024',
      num_hours: 10,
      description: '',
      status: hoursStatus.PENDING,
      image_url: '',
    },
    {
      id: '2',
      zid: 'z1231234',
      timestamp: '02/01/2024',
      num_hours: 20,
      description: '',
      status: hoursStatus.APPROVED,
      image_url: '',
    },
    {
      id: '3',
      zid: 'z1231234',
      timestamp: '03/01/2024',
      num_hours: 30,
      description: '',
      status: hoursStatus.REJECTED,
      image_url: '',
    },
  ],
} as hoursData;

export default function MenteeHome() {
  const router = useRouter();

  const [isLoading, setLoading] = React.useState(true);
  // const [hoursList, setHoursList] = useState({} as hoursData);
  const [hoursList, setHoursList] = useState(hoursInitList);

  useEffect(() => {
    setLoading(true);
    checkAuth(router);
    // getMenteeInfo();
    setInterval(() => setLoading(false), 1000);
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
              spacing={2}
              marginY={2}
            >
              <Button variant="contained">Add</Button>
            </Stack>

            <Stack spacing={2}>
              <HoursCollapsible
                hours={hoursList}
                type="logged"
                defaultExpanded={true}
              />
              <HoursCollapsible
                hours={hoursList}
                type="requested"
                defaultExpanded={false}
              />
            </Stack>
          </div>
        </MainContent>
      </main>
    </div>
  );
}
