import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Stack, Box, Typography, Button } from '@mui/material';

import ReactToPdf from 'react-to-pdf';

import { GET_DASHBOARD_COUNTRY_INTERACTIONS } from '../redux/actions/dashboard';
import { GET_SMB_DATA } from '../redux/actions/smbanalytics';
import { GET_WEB_DATA } from '../redux/actions/web';

import { BarChart, MapChart } from '../components/_dashboard/app';
import Loader from '../components/Loader';

const Generatepdf = (props) => {
  const { getCountyrInteractions, getSmbData, getWebData, countryInteractions, smbData, webData } =
    props;
  const ref1 = createRef();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    Promise.all([getCountyrInteractions(), getSmbData(), getWebData()]).then(() => {
      setisLoading(false);
    });
  }, [getCountyrInteractions, getSmbData, getWebData]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Box sx={{ width: '100%' }}>
          <Stack justifyContent="center" alignItems="center">
            <ReactToPdf targetRef={ref1} filename="CICAF Report.pdf">
              {({ toPdf }) => (
                <Button variant="contained" onClick={toPdf}>
                  Generate pdf
                </Button>
              )}
            </ReactToPdf>
            <Box
              sx={{ mt: 3, width: '60%', background: 'white', color: 'black', pl: 1 }}
              ref={ref1}>
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
                  Two Honeypots were deployed on the Network 1)SMB Honeypot 2)Web Honeypot .
                  Following is the statistical report on the deployed Honeypots.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <BarChart
                    data={smbData}
                    datakey={['doc_count']}
                    indexBy={'key'}
                    ytitle={'Number of Attacks'}
                    xtitle={'Countries'}
                    border={false}
                    height={300}
                    width={350}
                    textColor={'#1111111'}
                    top={10}
                  />
                  <BarChart
                    data={webData}
                    datakey={['doc_count']}
                    indexBy={'key'}
                    ytitle={'Number of Attacks'}
                    xtitle={'IP Address'}
                    border={false}
                    height={300}
                    width={350}
                    textColor={'#1111111'}
                    top={10}
                  />
                </Stack>
                <Typography variant="body1">
                  The above graphs show the number of attacks on the deployed Honeypots. The Right
                  Graph shows the number of attacks from each country on the SMB Honeypot. The Left
                  Graph shows the number of attacks from each IP Address on the Web Honeypot.
                  <br />
                  <br />
                </Typography>
                <Typography variant="h6">World Map Attacks</Typography>
                <MapChart
                  data={countryInteractions}
                  border={false}
                  height={400}
                  // width={350}
                  itemTextColor={'#1111111'}
                />
              </Stack>
            </Box>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Stack>
        </Box>
      )}
    </>
  );
};

Generatepdf.propTypes = {
  getCountyrInteractions: PropTypes.func.isRequired,
  getSmbData: PropTypes.func.isRequired,
  getWebData: PropTypes.func.isRequired,
  countryInteractions: PropTypes.array.isRequired,
  smbData: PropTypes.array.isRequired,
  webData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  countryInteractions: state.DASHBOARDREDUCER.country_interactions,
  smbData: state.SMBANALYTICSREDUCER.smb_data,
  webData: state.WEBREDUCER.web
});

const mapDispatchToProps = (dispatch) => ({
  getCountyrInteractions: bindActionCreators(GET_DASHBOARD_COUNTRY_INTERACTIONS, dispatch),
  getSmbData: bindActionCreators(GET_SMB_DATA, dispatch),
  getWebData: bindActionCreators(GET_WEB_DATA, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Generatepdf);
