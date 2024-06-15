import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { hoursInfo, hoursStatus } from '../../types/hours';
import { HoursTable } from './HoursTable';
import { useEffect, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';

export const HoursCollapsible = ({
  title,
  hours,
  statuses,
  actions = false,
  defaultExpanded,
}: {
  title: string;
  hours: hoursInfo[];
  statuses: hoursStatus[];
  actions?: boolean;
  defaultExpanded: boolean;
}) => {
  const [filteredHours, setFilteredHours] = useState([] as hoursInfo[]);

  const isEmpty = filteredHours?.length < 1;

  useEffect(() => {
    if (hours?.length > 0) {
      setFilteredHours(hours?.filter((h) => statuses.includes(h.status)));
    }
  }, [hours]);

  return (
    <div>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <h3>{`${title} ${isEmpty ? '' : `(${filteredHours.length})`}`}</h3>
        </AccordionSummary>
        <AccordionDetails>
          {!isEmpty ? <HoursTable hours={filteredHours} actions={actions} /> : 'Nothing to see here.'}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
