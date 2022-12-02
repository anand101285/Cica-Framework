import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// material
import { Box, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import HoneypotCard from '../components/_dashboard/honeypot/HoneypotCard';
import Loader from '../components/Loader';

import { GET_HONEYPOT_DETAILS } from '../redux/actions/honeypot';

// ----------------------------------------------------------------------
const Honeypots = (props) => {
  const { getHoneypots, machineData, userData } = props;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getHoneypots(userData.userId).then(() => {
      setisLoading(false);
    });
  }, [getHoneypots, userData.userId]);

  const honeypotDetailList = [
    { id: 1, name: 'SMB', type: 'GOOD', status: 'Active', link: 'smb' },
    { id: 2, name: 'WEB', type: 'GOOD', status: 'Active', link: 'web' }
    // { id: 3, name: 'Attacker Profiling', type: 'In Progress', status: 'Down', link: 'iptable' }
  ];

  return (
    <Page title="Honeypots">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Honeypots</Typography>
        </Box>
        {isLoading && <Loader />}
        {!isLoading && (
          <HoneypotCard honeypotList={honeypotDetailList} machineDetails={[...machineData]} />
        )}
      </Container>
    </Page>
  );
};

Honeypots.propTypes = {
  getHoneypots: PropTypes.func.isRequired,
  machineData: PropTypes.array.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = (state) => ({
  machineData: state.HONEYPOTREDUCER.machine_details,
  userData: state.AUTHREDUCER.user
});

const mapDispatchToProps = (dispatch) => ({
  getHoneypots: bindActionCreators(GET_HONEYPOT_DETAILS, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Honeypots);
