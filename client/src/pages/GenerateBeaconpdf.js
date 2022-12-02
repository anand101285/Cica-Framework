import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ReactToPdf from 'react-to-pdf';

import { Stack, Box, Typography, Button } from '@mui/material';

import { BarChart, DonutChart } from '../components/_dashboard/app';

import { GET_BEACONS_GENERATED } from '../redux/actions/dashboard';
import Loader from '../components/Loader';

const GenerateBeaconpdf = (props) => {
  const { getGeneratedBeacons, beaconsData, userData } = props;

  const [isLoading, setisLoading] = useState(true);

  const ref2 = createRef();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  useEffect(() => {
    getGeneratedBeacons(userData?.userId).then(() => {
      setisLoading(false);
    });
  }, [getGeneratedBeacons, userData.userId]);

  return (
    <>
      {isLoading === true && <Loader />}
      {isLoading === false && (
        <Box sx={{ width: '100%' }}>
          <Stack justifyContent="center" alignItems="center">
            <ReactToPdf targetRef={ref2} filename="Beacon Report.pdf">
              {({ toPdf }) => (
                <Button variant="contained" onClick={toPdf}>
                  Generate Beacon Summary
                </Button>
              )}
            </ReactToPdf>

            <Box
              sx={{ mt: 3, width: '60%', background: 'white', color: 'black', pl: 1 }}
              ref={ref2}>
              <Stack justifyContent="center" alignItems="center">
                <br />
                <h1>CICAF Report</h1>
                <Typography variant="h5">Report For Honeypots and HoneyTokens Deployed</Typography>
                <Typography variant="caption"> Date: {date} </Typography>
                <br />
              </Stack>
              <Stack>
                <Typography variant="h6">Honeypots</Typography>
                <Typography variant="body1">
                  Following is the report on Beacon Produced and deployed in our system.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <BarChart
                    data={beaconsData.data}
                    datakey={['doc_count']}
                    indexBy={'_id'}
                    ytitle={'Number of Beacons'}
                    xtitle={'Beacon Type'}
                    border={false}
                    height={300}
                    width={350}
                    textColor={'#1111111'}
                    top={10}
                  />
                  <BarChart
                    data={[beaconsData.recon, beaconsData.macro]}
                    datakey={['doc_count']}
                    indexBy={'_id'}
                    ytitle={'Number of Beacons'}
                    xtitle={'Beacon Type'}
                    border={false}
                    height={300}
                    width={350}
                    textColor={'#1111111'}
                    top={10}
                  />
                </Stack>
                <Typography variant="body1">
                  The graphs show the number of beacons producted by the system. The tokens are of 2
                  types 1)Reconnaissance 2)Macro. The left graph shows the number of beacons
                  produced by the system. The right graph shows the number of beacons depending on
                  the type. The Reconnaissance beacons are used to gather information about the
                  target system. The Macro beacons are used to execute malicious code on the target
                  system.
                </Typography>
                <br />
                <br />
                <Typography variant="h6">Honeypot Scans and Attacks</Typography>
                <Typography variant="body1">
                  Following is the report on number of scans and attacks on the deployed Honeypots.
                </Typography>
                <DonutChart border={false} height={400} textColor={'#1111111'} />
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

GenerateBeaconpdf.propTypes = {
  getGeneratedBeacons: PropTypes.func.isRequired,
  beaconsData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userData: state.AUTHREDUCER.user,
  beaconsData: state.DASHBOARDREDUCER.beacons
});

const mapDispatchToProps = (dispatch) => ({
  getGeneratedBeacons: bindActionCreators(GET_BEACONS_GENERATED, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateBeaconpdf);
