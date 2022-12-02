import React, { useEffect, useState } from 'react';
import socketConnection from 'socket.io-client';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Grid, Container } from '@mui/material';
import CustomCard from '../components/_dashboard/app/CustomCard/CustomCard';

import {
  GET_DASHBOARD_DIONAEA_COUNT,
  GET_DASHBOARD_WEB_COUNT,
  GET_DASHBOARD_IPTABLE_COUNT,
  GET_DASHBOARD_COMPROMISED_BEACONS,
  GET_DASHBOARD_COUNTRY_INTERACTIONS
} from '../redux/actions/dashboard';

import { BarChart, LineChart, MapChart, DonutChart } from '../components/_dashboard/app';

import { GET_SMB_DATA, GET_SMB_TIMESTAMPS } from '../redux/actions/smbanalytics';
import { GET_IP_TABLE_INTERACTIONS } from '../redux/actions/iptable';
import { GET_WEB_DATA } from '../redux/actions/web';

import Loader from '../components/Loader';
import { APP_URL } from '../config';

// ----------------------------------------------------------------------

const DashboardApp = (props) => {
  const {
    getSmbCount,
    getWebCount,
    getfirewallcount,
    getCompromisedBeacons,
    getCountryInteractions,
    getSmbData,
    getSmbTimestamps,
    getWebData,
    getFirewallInteractions,
    userData,
    smbCount,
    webCount,
    firewallCount,
    compromisedBeacons,
    countryInteractions,
    smbData,
    smbTimestamps,
    webData
  } = props;
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const socket = socketConnection(`${APP_URL}/api/socket`);
    socket.on('tokenaccesses', () => {
      getCompromisedBeacons();
    });
    setisLoading(false);
    Promise.all([
      getSmbCount(),
      getWebCount(),
      getfirewallcount(),
      getCompromisedBeacons(),
      getCountryInteractions(),
      getSmbData(),
      getSmbTimestamps(),
      getWebData(),
      getFirewallInteractions()
    ])
      .then(() => {
        console.log('done');
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    getSmbCount,
    getWebCount,
    getfirewallcount,
    getCompromisedBeacons,
    getCountryInteractions,
    getSmbData,
    getSmbTimestamps,
    getWebData,
    getFirewallInteractions,
    userData.userId
  ]);

  return (
    <Container maxWidth="xl">
      {isLoading === true && <Loader />}
      {isLoading === false && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard num={firewallCount} name="Total Interactions"></CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard num={smbCount} name="SMB Honeypot Attacks "></CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard num={webCount} name="Web Honeypot Attacks"></CustomCard>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CustomCard num={compromisedBeacons} name="Compromised Beacons"></CustomCard>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <BarChart
                title="SMB Attack (Country Based)"
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
            <Grid item xs={12} md={4} lg={4}>
              <LineChart
                title="SMB Attacks (Time Based)"
                data={[{ id: 'smb', color: 'hsl(174, 70%, 50%)', data: smbTimestamps }]}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <BarChart
                title="WEB Attack"
                data={webData}
                datakey={['doc_count']}
                indexBy={'key'}
                ytitle={'Number of Attacks'}
                xtitle={'IP Address'}
                border={true}
                height={300}
                textColor={'#ffffffff'}
                top={30}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <DonutChart
                title="Attack Monthly Details"
                border={true}
                height={400}
                textColor={'#ffffffff'}
                honeypotData={[
                  {
                    id: 'smb_data',
                    label: 'SMB Access',
                    value: smbCount
                  },
                  {
                    id: 'web_count',
                    label: 'Web Access',
                    value: smbCount
                  },
                  {
                    id: 'beacon_count',
                    label: 'Beacon Access',
                    value: smbCount
                  }
                ]}
              />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <MapChart
                title="Honeypot Attack Map"
                data={countryInteractions}
                border={true}
                height={400}
                itemTextColor={'#ffffff'}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

DashboardApp.propTypes = {
  getSmbCount: PropTypes.func.isRequired,
  getWebCount: PropTypes.func.isRequired,
  getfirewallcount: PropTypes.func.isRequired,
  getCompromisedBeacons: PropTypes.func.isRequired,
  getCountryInteractions: PropTypes.func.isRequired,
  getSmbData: PropTypes.func.isRequired,
  getSmbTimestamps: PropTypes.func.isRequired,
  getWebData: PropTypes.func.isRequired,
  getFirewallInteractions: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  smbCount: PropTypes.number.isRequired,
  webCount: PropTypes.number.isRequired,
  firewallCount: PropTypes.number.isRequired,
  compromisedBeacons: PropTypes.number.isRequired,
  countryInteractions: PropTypes.array.isRequired,
  smbData: PropTypes.array.isRequired,
  smbTimestamps: PropTypes.array.isRequired,
  webData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  userData: state.AUTHREDUCER.user,
  smbCount: state.DASHBOARDREDUCER.dionaea_count,
  webCount: state.DASHBOARDREDUCER.web_count,
  firewallCount: state.DASHBOARDREDUCER.iptable_count,
  compromisedBeacons: state.DASHBOARDREDUCER.compromised_beacons,
  countryInteractions: state.DASHBOARDREDUCER.country_interactions,
  smbData: state.SMBANALYTICSREDUCER.smb_data,
  smbTimestamps: state.SMBANALYTICSREDUCER.smb_timestamps,
  webData: state.WEBREDUCER.web
});

const mapDispatchToProps = (dispatch) => ({
  getSmbCount: bindActionCreators(GET_DASHBOARD_DIONAEA_COUNT, dispatch),
  getWebCount: bindActionCreators(GET_DASHBOARD_WEB_COUNT, dispatch),
  getfirewallcount: bindActionCreators(GET_DASHBOARD_IPTABLE_COUNT, dispatch),
  getCompromisedBeacons: bindActionCreators(GET_DASHBOARD_COMPROMISED_BEACONS, dispatch),
  getCountryInteractions: bindActionCreators(GET_DASHBOARD_COUNTRY_INTERACTIONS, dispatch),
  getSmbData: bindActionCreators(GET_SMB_DATA, dispatch),
  getSmbTimestamps: bindActionCreators(GET_SMB_TIMESTAMPS, dispatch),
  getFirewallInteractions: bindActionCreators(GET_IP_TABLE_INTERACTIONS, dispatch),
  getWebData: bindActionCreators(GET_WEB_DATA, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardApp);
