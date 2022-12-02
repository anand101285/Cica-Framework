import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { GET_NMAP_DATA_ATTACKER, GET_INTEL_IP, CLEAR_DATA } from '../redux/actions/attackerInfo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sentenceCase } from 'change-case';
import Label from '../components/Label';
import { Button, Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import {
  LanguageOutlined,
  PublicOutlined,
  CorporateFare,
  ReportProblemOutlined,
  LocationCityOutlined,
  MapOutlined
} from '@mui/icons-material';

const AttackerNmap = (props) => {
  const { getNmapData, getIntelIp, clearHistory, data, intel, scanLoading } = props;

  const [ip, setip] = useState();
  const [propsData, setpropsData] = useState();
  const [propsIntel, setpropsIntel] = useState();

  const location = useLocation();
  const regexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  const finalRegexExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  useEffect(() => {
    if (location.state) {
      setip(location.state.ip);
    }
  }, [location.state]);

  const runScan = () => {
    getNmapData(ip);
    getIntelIp(ip);
  };

  useEffect(() => {
    if (data.lenght !== 0 && Object.keys(intel).length !== 0) {
      setpropsData(data);
      setpropsIntel(intel);
    }
  }, [data, intel]);

  useEffect(() => {
    return () => {
      clearHistory();
      setip(null);
      setpropsData(null);
      setpropsIntel(null);
    };
  }, [clearHistory]);

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-evenly" alignItems="center">
        <Stack direction="row" spacing={2}>
          <TextField
            id="outlined-basic"
            label="ip address"
            variant="outlined"
            value={ip}
            onChange={(e) => setip(e.target.value)}
            error={!(regexExp && regexExp.test(ip))}
            required
          />
          <Button
            variant="outlined"
            disabled={!(finalRegexExp && finalRegexExp.test(ip)) || !ip}
            onClick={() => {
              runScan();
            }}>
            Run Nmap
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">Scan Status:</Typography>
          {scanLoading ? (
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Label variant="outlined" color={'warning'} sx={{ height: 30 }}>
              Not Running
            </Label>
          )}
        </Stack>
      </Stack>

      {propsData && propsData.length > 0 && (
        <Box sx={{ p: 3, m: 2 }} className="cs-card">
          <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center', pb: 2 }}>
            <Typography variant="h4" align="center">
              Nmap Scan Results
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead style={{ background: '#1d2835f2' }}>
                <TableRow>
                  <TableCell align="center">Port</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Banner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {propsData &&
                  propsData.map((portDetail, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center" component="th" scope="row">
                        {portDetail.port}
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          variant="ghost"
                          color={portDetail.status === 'open' ? 'success' : 'error'}>
                          {sentenceCase(portDetail.status)}
                        </Label>
                      </TableCell>
                      <TableCell align="center">{portDetail.banner}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box sx={{ m: 2 }} className="cs-card">
        <CardContent>
          <Box sx={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
            <LanguageOutlined fontSize="large" />
            <Typography sx={{ pl: 2 }} variant="h4" align="center">
              General Intelligence OSINT
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                  <TableBody>
                    {propsIntel && (
                      <Fragment>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="right">
                            <Typography variant="p">
                              <LocationCityOutlined sx={{ mr: '5%' }} />
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="p">City</Typography>
                          </TableCell>
                          <TableCell align="center">
                            {propsIntel.geo && propsIntel.geo.city}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="right">
                            <Typography variant="p">
                              <MapOutlined sx={{ mr: '5%' }} />
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="p">State</Typography>
                          </TableCell>
                          <TableCell align="center">
                            {propsIntel.geo && propsIntel.geo.state}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="right">
                            <Typography variant="p">
                              <PublicOutlined sx={{ mr: '5%' }} />
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="p">Country</Typography>
                          </TableCell>
                          <TableCell align="center">
                            {propsIntel.geo && propsIntel.geo.country}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="right">
                            <Typography variant="p">
                              <CorporateFare sx={{ mr: '5%' }} />
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="p">Organization</Typography>
                          </TableCell>
                          <TableCell align="center">{propsIntel.org}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="right">
                            <Typography variant="p">
                              <ReportProblemOutlined sx={{ mr: '5%' }} />
                            </Typography>
                          </TableCell>
                          <TableCell align="left" component="th" scope="row">
                            <Typography variant="p">Spam Level</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Label>{propsIntel.spam_level}</Label>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    )}
                    {!propsIntel && (
                      <Fragment>
                        <TableRow>
                          <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography sx={{ m: 5 }} align="center">
                              ---------- Nothing to Show ---------
                              <br />
                              ---------- Run Nmap Scan To See Results ---------
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

AttackerNmap.propTypes = {
  getNmapData: PropTypes.func.isRequired,
  getIntelIp: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
  data: PropTypes.array,
  intel: PropTypes.object,
  scanLoading: PropTypes.bool,
  intelLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  data: state.ATTACKERINFOREDUCER.nmapDetails,
  intel: state.ATTACKERINFOREDUCER.intelData,
  scanLoading: state.ATTACKERINFOREDUCER.scanLoading,
  intelLoading: state.ATTACKERINFOREDUCER.intelLoading
});

const mapDispatchToProps = (dispatch) => ({
  getNmapData: bindActionCreators(GET_NMAP_DATA_ATTACKER, dispatch),
  getIntelIp: bindActionCreators(GET_INTEL_IP, dispatch),
  clearHistory: bindActionCreators(CLEAR_DATA, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AttackerNmap);
