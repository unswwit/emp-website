import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { hoursInfo, hoursStatus } from '../../types/hours';
import { ChangeEvent, useMemo, useState } from 'react';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hours?.length) : 0;

  const visibleRows = useMemo(
    () => hours?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width={50}>Timestamp</TableCell>
              <TableCell width={200}>Hours</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows?.map((h, k) => {
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
            {emptyRows > 0 && (
              <TableRow sx={{ height: 65 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={hours?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
