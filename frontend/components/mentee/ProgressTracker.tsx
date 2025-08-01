import React, { useEffect, useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { hoursInfo, hoursStatus } from '../../types/hours';

const StyledBox = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '40px 100px',
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
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

const ProgressTracker = ({ hours, statuses }: { hours: hoursInfo[]; statuses: hoursStatus[] }) => {
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
    <StyledBox>
      <ProgressBar variant="determinate" value={progressValue} />
      <LabelContainer>
        <h4>Hours Completed: {hoursCompleted}</h4>
        <h4>Hours Remaining: {hoursRemaining}</h4>
      </LabelContainer>
    </StyledBox>
  );
};

export default ProgressTracker;
