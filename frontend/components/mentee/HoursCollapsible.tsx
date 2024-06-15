import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { hoursInfo, hoursStatus, hoursType } from '../../types/hours';
import { HoursTable } from './HoursTable';
import { useEffect, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';

export const HoursCollapsible = ({
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
    if (hours?.length > 0) {
      if (type === hoursType.LOGGED)
        setFilteredHours(
          hours?.filter((h) => h.status === hoursStatus.APPROVED)
        );
      else if (type === hoursType.REQUESTED)
        setFilteredHours(
          hours?.filter((h) => h.status !== hoursStatus.APPROVED)
        );
    }
  }, [hours]);

  return (
    <div>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
          <h3>{type === hoursType.LOGGED ? 'Logged Hours' : 'Requested'}</h3>
        </AccordionSummary>
        <AccordionDetails>
          {filteredHours?.length > 0 ? (
            <HoursTable hours={filteredHours} />
          ) : (
            'Nothing to see here.'
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
