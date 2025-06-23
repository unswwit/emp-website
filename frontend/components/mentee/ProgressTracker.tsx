import React, { useEffect, useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { hoursInfo, hoursStatus } from '../../types/hours';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // [theme.breakpoints.down('sm')]: {
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   gap: '8px',
  // },
}));

const ProgressBarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  padding: '30px',
  // [theme.breakpoints.down('sm')]: {
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   gap: '8px',
  // },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 40,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#eee',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: '#FCB14C',
  },
  [theme.breakpoints.down('sm')]: {
    height: 20,
  },
}));

const LabelContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
}));

const ProgressTracker = ({
  hours,
  statuses,
  defaultExpanded = false,
}: {
  hours: hoursInfo[];
  statuses: hoursStatus[];
  defaultExpanded?: boolean;
}) => {
  const [filteredHours, setFilteredHours] = useState([] as hoursInfo[]);

  useEffect(() => {
    if (hours?.length > 0) {
      setFilteredHours(hours?.filter((h) => statuses.includes(h.status)));
    }
  }, [hours, statuses]);

  const totalHours = 20;
  const hoursCompleted = filteredHours.reduce(
    (sum: number, h: hoursInfo) => sum + (typeof h.num_hours === 'number' ? h.num_hours : 0),
    0
  );
  const hoursRemainingRaw = totalHours - hoursCompleted;
  const hoursRemaining = hoursRemainingRaw > 0 ? hoursRemainingRaw : 0;
  const progressValue = hoursCompleted >= totalHours ? 100 : (hoursCompleted / totalHours) * 100;

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Container>
          <h3>Progress</h3>
          <ProgressBarContainer>
            <ProgressBar variant="determinate" value={progressValue} />
            <LabelContainer>
              <h4>Hours Completed: {hoursCompleted}</h4>
              <h4>Hours Remaining: {hoursRemaining}</h4>
            </LabelContainer>
          </ProgressBarContainer>
        </Container>
      </AccordionSummary>
      <AccordionDetails>Details of Activites here</AccordionDetails>
    </Accordion>
  );
};

export default ProgressTracker;
