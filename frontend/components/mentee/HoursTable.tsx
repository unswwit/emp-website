import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { hoursInfo, hoursStatus } from '../../types/hours';

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

export const HoursTable = ({ hours }: { hours: hoursInfo[] }) => {
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
