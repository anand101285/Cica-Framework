import React, { useEffect, useState } from 'react';
import socketConnection from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, IconButton, Switch, Collapse } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sentenceCase } from 'change-case';
import Label from '../components/Label';
import Loader from '../components/Loader';

import {
  GET_BEACON_SUMMARY_DATA,
  CHANGE_ACCESSIBILTY_OF_TOKEN,
  DELETE_TOKEN
} from '../redux/actions/beaconsummary';

import { APP_URL } from '../config';
// ----------------------------------------------------------------------

const BeaconSummary = (props) => {
  const { getBeaconData, changeTokenAccess, deleteToken, beaconSummary, userData } = props;

  const [isLoading, setisLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState({ tokenId: 0, tokenType: 'none' });

  const handleClickDeleteOpen = (tokenId, tokenType) => {
    setSelectedToDelete({ tokenId, tokenType });
    setOpenDeleteModal(true);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    setisLoading(true);
    const socket = socketConnection(`${APP_URL}/api/socket`);
    socket.on('tokens', () => {
      getBeaconData(userData.userId);
    });
    socket.on('tokenaccesses', () => {
      getBeaconData(userData.userId);
    });
    getBeaconData(userData.userId).then(() => {
      setisLoading(false);
    });
  }, [getBeaconData, userData]);

  const changeToggle = (toggle, tokenid) => {
    changeTokenAccess(userData.userId, toggle, tokenid);
  };
  const deleteTokenHandler = () => {
    deleteToken(userData.userId, selectedToDelete.tokenId);
    handleClose();
  };
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this token?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h5">Token:</Typography>
            <Typography variant="p">
              {selectedToDelete.tokenId} - {selectedToDelete.tokenType}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={() => deleteTokenHandler()}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">Beacon Summary</Typography>
      </Box>
      {isLoading && <Loader />}
      {!isLoading && beaconSummary && (
        <Box sx={{ p: 3, m: 2 }} className="cs-card">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead style={{ background: '#1d2835f2' }}>
                <TableRow>
                  <TableCell />
                  <TableCell>Tokenid</TableCell>
                  <TableCell align="center">File Type</TableCell>
                  <TableCell align="center">Uploaded on</TableCell>
                  <TableCell align="center">Accessed</TableCell>
                  <TableCell align="center">Token Status</TableCell>
                  <TableCell align="center">Manage Token</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody> */}
              {beaconSummary &&
                beaconSummary.map((data) => (
                  <TableBody key={data._id}>
                    <TableRow
                      sx={{ '& > *': { borderBottom: 'unset' } }}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          disabled={data.attackerdata.length === 0}
                          onClick={() => {
                            setOpen(!open);
                            if (open !== data._id) {
                              setOpen(data._id);
                            }
                          }}>
                          {open === data._id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data._id}
                      </TableCell>
                      <TableCell align="center">{data.type}</TableCell>
                      <TableCell align="center">
                        {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          variant="ghost"
                          color={(data.attackerdata.length !== 0 && 'error') || 'success'}>
                          {sentenceCase(
                            data.attackerdata.length !== 0 ? 'Accessed' : 'Not Accessed'
                          )}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <Switch
                          // classes={switchStyles}
                          checked={data.accessible}
                          size="small"
                          onChange={(_, value) => {
                            changeToggle(value, data._id);
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handleClickDeleteOpen(data._id, data.type);
                          }}>
                          <DeleteIcon style={{ color: '#B72136' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open === data._id} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }} style={{ margin: '30px 2px' }}>
                            <Typography variant="h6" gutterBottom component="div">
                              Adversary Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead style={{ background: '#1d2835f2', opacity: 0.9 }}>
                                <TableRow>
                                  <TableCell>Hacker&apos;s Ip</TableCell>
                                  <TableCell align="right" style={{ paddingRight: '20%' }}>
                                    Actions
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.attackerdata.length !== 0
                                  ? data.attackerdata.map((attack, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{attack.ip}</TableCell>
                                        <TableCell align="right">
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'flex-end'
                                            }}>
                                            <Button
                                              variant="outlined"
                                              sx={{ width: '30%', textAlign: 'center', mr: 3 }}
                                              disabled={data.attackerdata.length === 0}
                                              onClick={() => {
                                                return data.attackerdata.length !== 0
                                                  ? navigate(`/dashboard/nmapscan`, {
                                                      state: { ip: attack.ip }
                                                    })
                                                  : null;
                                              }}
                                              underline="hover">
                                              Run Scan
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              sx={{ width: '30%', textAlign: 'center' }}
                                              disabled={data.attackerdata.length === 0}
                                              onClick={() => {
                                                return data.attackerdata.length !== 0
                                                  ? navigate(`/dashboard/attacker_timeline`, {
                                                      state: { ip: attack.ip }
                                                    })
                                                  : null;
                                              }}
                                              underline="hover">
                                              Preview Timeline
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  : '-'}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              {/* </TableBody> */}
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

BeaconSummary.propTypes = {
  getBeaconData: PropTypes.func.isRequired,
  changeTokenAccess: PropTypes.func.isRequired,
  deleteToken: PropTypes.func.isRequired,
  beaconSummary: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  beaconSummary: state.BEACONSUMMARYREDUCER.beacon_summary,
  userData: state.AUTHREDUCER.user
});

const mapDispatchToProps = (dispatch) => ({
  getBeaconData: bindActionCreators(GET_BEACON_SUMMARY_DATA, dispatch),
  changeTokenAccess: bindActionCreators(CHANGE_ACCESSIBILTY_OF_TOKEN, dispatch),
  deleteToken: bindActionCreators(DELETE_TOKEN, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(BeaconSummary);
