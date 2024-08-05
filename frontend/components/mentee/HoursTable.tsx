import {
  Button,
  ButtonGroup,
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
import { hoursAdminActions, hoursImage, hoursInfo, hoursStatus } from '../../types/hours';
import { ChangeEvent, useMemo, useState } from 'react';
import { UnstyledButton } from '@mantine/core';

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

export const HoursTable = ({
  hours,
  actions,
  onImage,
  viewZid = false,
  viewFname = false,
  viewLname = false,
}: {
  hours: hoursInfo[];
  actions?: hoursAdminActions;
  onImage: (image: hoursImage) => void;
  viewZid?: boolean;
  viewFname?: boolean;
  viewLname?: boolean;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hours?.length) : 0;

  const visibleRows = useMemo(
    () =>
      hours
        ?.slice()
        .reverse()
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [hours, page, rowsPerPage]
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={175}>
                <b>Timestamp</b>
              </TableCell>
              {viewZid && (
                <TableCell>
                  <b>zID</b>
                </TableCell>
              )}
              {viewFname && (
                <TableCell>
                  <b>First Name</b>
                </TableCell>
              )}
              {viewLname && (
                <TableCell>
                  <b>Last Name</b>
                </TableCell>
              )}
              <TableCell width={100}>
                <b>Hours</b>
              </TableCell>
              <TableCell width={800}>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Proof</b>
              </TableCell>
              <TableCell align={actions ? 'left' : 'right'}>
                <b>Status</b>
              </TableCell>
              {actions && (
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows?.map((h, k) => {
              return (
                <TableRow key={k} hover>
                  <TableCell>{h.timestamp}</TableCell>
                  {viewZid && <TableCell>{h.zid}</TableCell>}
                  {viewFname && <TableCell>{h.firstname}</TableCell>}
                  {viewLname && <TableCell>{h.lastname}</TableCell>}
                  <TableCell>{h.num_hours}</TableCell>
                  <TableCell>{h.description}</TableCell>
                  <TableCell>
                    <UnstyledButton
                      onClick={() =>
                        onImage({
                          imageSrc: h.image_url,
                          imageAlt: `Proof picture for ${h.description}`,
                        })
                      }
                    >
                      <img
                        src={h.image_url}
                        alt={`Proof picture for ${h.description}`}
                        height={50}
                        width={50}
                      />
                    </UnstyledButton>
                  </TableCell>
                  <TableCell align={actions ? 'left' : 'right'}>
                    <Chip
                      sx={{ textTransform: 'uppercase' }}
                      label={h.status}
                      color={mapStatusColor(h.status)}
                    />
                  </TableCell>
                  {actions && (
                    <TableCell align="right">
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => actions.approveAction(h.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => actions.rejectAction(h.id)}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  )}
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
