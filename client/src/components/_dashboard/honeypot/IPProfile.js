import React from 'react';
import { Card, Box, Typography } from '@mui/material';

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ip}
        </TableCell>
        <TableCell align="center">{row.hashCount}</TableCell>
        <TableCell align="center">{row.interactions}</TableCell>
        <TableCell align="center">{row.scans}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details Coming SOON
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                style={{ background: '#1d2835f2', opacity: 0.7 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>TEST</TableCell>
                    <TableCell>TEST</TableCell>
                    <TableCell align="right">TEST</TableCell>
                    <TableCell align="right">TEST</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    ip: PropTypes.string.isRequired,
    hashCount: PropTypes.number.isRequired,
    interactions: PropTypes.number.isRequired,
    scans: PropTypes.number.isRequired
  })
};

const IPProfile = ({ rows }) => (
  <Card className="cs-card">
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead style={{ background: '#1d2835f2' }}>
            <TableRow>
              <TableCell />
              <TableCell>Ip address</TableCell>
              <TableCell align="center">Hash Count</TableCell>
              <TableCell align="center">Interactions</TableCell>
              <TableCell align="center">Scans</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.ip && row.hashCount} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Card>
);

IPProfile.propTypes = {
  rows: PropTypes.array.isRequired
};

export default IPProfile;
