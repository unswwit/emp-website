import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { hoursAdminActions, hoursImage, hoursInfo, hoursStatus } from '../../types/hours';
import { HoursTable } from './HoursTable';
import { useEffect, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';

export const HoursCollapsible = ({
  title,
  hours,
  statuses,
  actions,
  defaultExpanded = false,
  viewZid = false,
  viewFname = false,
  viewLname = false,
  onImage,
  onRowClick,
}: {
  title: string;
  hours: hoursInfo[];
  statuses: hoursStatus[];
  actions?: hoursAdminActions;
  defaultExpanded?: boolean;
  viewZid?: boolean;
  viewFname?: boolean;
  viewLname?: boolean;
  onImage: (image: hoursImage) => void;
  onRowClick?: (log: hoursInfo) => void;
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
          {!isEmpty ? (
            <HoursTable
              hours={filteredHours}
              actions={actions}
              onImage={onImage}
              viewZid={viewZid}
              viewFname={viewFname}
              viewLname={viewLname}
              onRowClick={onRowClick}
            />
          ) : (
            'Nothing to see here.'
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
