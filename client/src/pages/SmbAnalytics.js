import { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Box, Grid, Container, Typography, Card, CardHeader } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { sentenceCase } from 'change-case';
import TablePagination from '@mui/material/TablePagination';
import Label from '../components/Label';
import Page from '../components/Page';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import { BarChart, LineChart } from '../components/_dashboard/app';

import { GET_SMB_DATA, GET_SMB_TIMESTAMPS, GET_SMB_REPORTS } from '../redux/actions/smbanalytics';

// ----------------------------------------------------------------------

const SmbAnalytics = (props) => {
  const { getSmbData, getSmbTimestamps, getSmbReports, smbData, smbTimestamps, smbReports } = props;

  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const location = useLocation();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (location.state) {
      Promise.all([
        getSmbData(location.state.id),
        getSmbTimestamps(location.state.id),
        getSmbReports(location.state.id)
      ]).then(() => {
        setisLoading(false);
      });
    }
  }, [getSmbData, getSmbTimestamps, getSmbReports, location.state]);

  return (
    <Page title="Honeypots">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">SMB Analytics</Typography>
        </Box>
        {isLoading === true && <Loader />}
        {isLoading === false && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <BarChart
                title="SMB Attack Bar"
                data={smbData}
                datakey={['doc_count']}
                indexBy={'key'}
                ytitle={'Number of Attacks'}
                xtitle={'Countries'}
                border={true}
                height={300}
                textColor={'#ffffffff'}
                top={30}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <LineChart
                title="SMB Attacks Histogram"
                data={[{ id: 'smb', color: 'hsl(174, 70%, 50%)', data: smbTimestamps }]}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Grid container sx={{ p: 3 }} spacing={3}>
                <Grid item xs={12} md={6} lg={12}>
                  <Card>
                    <CardHeader title="Top 10 Severe Binaries " subheader="" />
                    <Box sx={{ p: 2, pb: 1 }} dir="ltr">
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Md5 Hash</TableCell>
                              <TableCell align="center">Cuckoo Score</TableCell>
                              <TableCell align="center">Severity Level</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {smbReports
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((ele) => (
                                <TableRow
                                  key={ele.hash}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row">
                                    {ele.hash}
                                  </TableCell>
                                  <TableCell align="center">
                                    {ele.score}
                                    {/* <Label variant="ghost" color="success">
                                        {sentenceCase('Good')}
                                      </Label> */}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Label
                                      variant="ghost"
                                      color={ele.score > 7 ? 'error' : 'success'}>
                                      {sentenceCase('High')}
                                    </Label>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={smbReports.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

SmbAnalytics.propTypes = {
  getSmbData: PropTypes.func.isRequired,
  getSmbTimestamps: PropTypes.func.isRequired,
  getSmbReports: PropTypes.func.isRequired,
  smbData: PropTypes.array.isRequired,
  smbTimestamps: PropTypes.array.isRequired,
  smbReports: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  smbData: state.SMBANALYTICSREDUCER.smb_data,
  smbTimestamps: state.SMBANALYTICSREDUCER.smb_timestamps,
  smbReports: state.SMBANALYTICSREDUCER.smb_reports
});

const mapDispatchToProps = (dispatch) => ({
  getSmbData: bindActionCreators(GET_SMB_DATA, dispatch),
  getSmbTimestamps: bindActionCreators(GET_SMB_TIMESTAMPS, dispatch),
  getSmbReports: bindActionCreators(GET_SMB_REPORTS, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SmbAnalytics);
