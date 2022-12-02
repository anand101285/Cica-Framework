import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, Box, Typography, Button, Collapse, IconButton } from '@mui/material';

// components
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sentenceCase } from 'change-case';
import Label from '../../Label';

const typeColor = (type) => {
  if (type.toUpperCase() === 'GOOD') {
    return 'success';
  }
  if (type.toUpperCase() === 'IN PROGRESS') {
    return 'warning';
  }
  if (type.toUpperCase() === 'Bad') {
    return 'error';
  }
  return 'default';
};

const statusColor = (status) => {
  if (status.toUpperCase() === 'ACTIVE') {
    return 'success';
  }
  if (status.toUpperCase() === 'DOWN') {
    return 'error';
  }
  return 'default';
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th">
          {row?.systemName}
        </TableCell>
        <TableCell align="right">{row?.macAddress}</TableCell>
        <TableCell align="right">{row?.created_at}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} style={{ margin: '30px 2px' }}>
              <Typography variant="h6" gutterBottom component="div">
                Honeypots Connected
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead style={{ background: '#1d2835f2', opacity: 0.9 }}>
                  <TableRow>
                    <TableCell>Depolyment name</TableCell>
                    <TableCell align="center">Condition</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.honeypotList?.map((honeypotRow, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Button
                          onClick={() => {
                            navigate(`/dashboard/honeypot/${honeypotRow.link}`, {
                              state: { id: props.machineId }
                            });
                          }}
                          color="primary">
                          {honeypotRow.name}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Label variant="ghost" color={typeColor(honeypotRow.type)}>
                          {sentenceCase(`${honeypotRow.type}`)}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <Label variant="ghost" color={statusColor(honeypotRow.status)}>
                          {sentenceCase(`${honeypotRow.status}`)}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const HoneypotCard = (props) => (
  <Grid container spacing={4} style={{ marginTop: '10px' }}>
    <Grid item sm={12} lg={12}>
      <Card className="cs-card" style={{ padding: '2%' }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead style={{ background: '#1d2835f2' }}>
              <TableRow>
                <TableCell />
                <TableCell align="center">Machine Name</TableCell>
                <TableCell align="right">Mac Address</TableCell>
                <TableCell align="right">Created On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.machineDetails?.map((row, key) => (
                <Row key={key} row={row} honeypotList={props.honeypotList} machineId={row._id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Box sx={{ p: 3 }}>
          <Stack direction="row" mb={5}>
            <Icon icon={monitorOutline} width={45} height={45} />
            <Typography variant="h4" gutterBottom sx={{ pl: 1 }}>
              Virtual Machine
            </Typography>
          </Stack>
          <Typography variant="h6" gutterBottom>
            Machine Name:
          </Typography>
          <Typography variant="body1" color="primary">
            {props.machineDetails.systemName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Mac Address:
          </Typography>
          <Typography variant="body1" color="primary">
            {props.machineDetails.macAddress}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Created on:
          </Typography>
          <Typography variant="body1" color="primary">
            {props.machineDetails.created_at}
          </Typography>
          <Stack direction="row" justifyContent="center" mb={5} mt={2}>
            <Typography variant="h6" gutterBottom sx={{ pl: 1 }}>
              Honeypots Connected
            </Typography>
          </Stack>
          <Card className="cs-card">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead style={{ background: '#1d2835f2' }}>
                  <TableRow>
                    <TableCell>Depolyment name</TableCell>
                    <TableCell align="center">Condition</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.honeypotList?.map((row) => (
                    <TableRow
                      key={row.id && row.name && row.status && row.condition}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Button
                          component={Link}
                          to={`/dashboard/honeypot/${row.link}`}
                          color="primary"
                        >
                          {row.name}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Label variant="ghost" color={typeColor(row.type)}>
                          {sentenceCase(`${row.type}`)}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <Label variant="ghost" color={statusColor(row.status)}>
                          {sentenceCase(`${row.status}`)}
                        </Label>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.honeypotList.map((row) => (
                      <TableRow
                        key={row.id && row.name && row.link}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Button
                            component={Link}
                            to={`/dashboard/honeypot/${row.link}`}
                            color="primary"
                          >
                            {row.name}
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Label variant="ghost" color={typeColor(row.type)}>
                            {sentenceCase(`${row.type}`)}
                          </Label>
                        </TableCell>
                        <TableCell align="center">
                          <Label variant="ghost" color={statusColor(row.status)}>
                            {sentenceCase(`${row.status}`)}
                          </Label>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        </Card>
      </Grid>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box> */}
      </Card>
    </Grid>
  </Grid>
);

Row.propTypes = {
  honeypotList: PropTypes.array,
  row: PropTypes.object,
  machineId: PropTypes.string
};

HoneypotCard.propTypes = {
  machineDetails: PropTypes.array,
  honeypotList: PropTypes.array
};

export default HoneypotCard;
