import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Container, Grid, Collapse, Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ReactD3Tree from './reactD3Tree';
import Loader from '../Loader';

import { GET_IP_PROFILING } from '../../redux/actions/ipprofiling';
import { GET_INTEL_IP, HIDE_INTEL_IP } from '../../redux/actions/attackerInfo';

const IpBubbles = (props) => {
  const [visitedIps, setVisitedIps] = useState([]);
  const [loader, setLoader] = useState(false);

  const getIpProfiling = async (ip) => {
    setLoader(true);
    props.setIpProfiling({});
    setVisitedIps([...visitedIps, ip]);
    const ipDetails = await props.GET_IP_PROFILING(ip);
    const details = await props.GET_INTEL_IP(ip);
    props.setShowIps(false);

    if (details && ipDetails) {
      props.setIpProfiling({
        ipDetails: props && props.ipProfile,
        details: props && props.intelData,
        ip
      });
    } else {
      props.setIpProfiling({ ip });
    }

    setLoader(false);
  };

  return (
    <Container maxWidth="xl">
      {props.allProfilingIps && (
        <Collapse in={props.showIps}>
          <Grid container spacing={3}>
            {props.allProfilingIps.map((data, i) => (
              <Grid item xs={4} md={3} lg={2} key={i}>
                <Box
                  style={{
                    cursor: 'pointer',
                    background:
                      visitedIps?.length > 0 &&
                      visitedIps.filter((vIP) => vIP === data?.ip)?.length > 0
                        ? // ? `linear-gradient(to right, #784646, #cd9090)`
                          '#0c4a57'
                        : ``
                  }}
                  className="cs-card2"
                  onClick={() => getIpProfiling(data?.ip)}>
                  <Typography>
                    {loader === true && (
                      <CircularProgress size={15} thickness={3} style={{ color: 'white' }} />
                    )}{' '}
                    &nbsp;
                    {data?.ip}
                    <br />
                    <small>Scans: {data?.scans} </small>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      )}

      <Collapse in={!props.showIps}>
        {props?.ipProfiling?.ip ? (
          <ReactD3Tree
            ipProfiling={
              props?.ipProfiling?.details !== undefined
                ? props.ipProfiling
                : {
                    ip: props?.ipProfiling?.ip,
                    details: props.intelData,
                    ipProfile: props.ipProfile
                  }
            }
          />
        ) : (
          <Loader />
        )}
      </Collapse>
    </Container>
  );
};

IpBubbles.propTypes = {
  GET_IP_PROFILING: PropTypes.func.isRequired,
  GET_INTEL_IP: PropTypes.func.isRequired,
  HIDE_INTEL_IP: PropTypes.func.isRequired,
  ipProfile: PropTypes.object,
  intelData: PropTypes.object,
  allProfilingIps: PropTypes.array,
  setShowIps: PropTypes.func,
  showIps: PropTypes.bool,
  ipProfiling: PropTypes.object,
  setIpProfiling: PropTypes.func
};

const mapStateToProps = (state) => ({
  intelData: state.ATTACKERINFOREDUCER.intelData,
  ipProfile: state.IPPROFILINGREDUCER.ipProfile
});

const mapDispatchToProps = (dispatch) => ({
  GET_IP_PROFILING: bindActionCreators(GET_IP_PROFILING, dispatch),
  GET_INTEL_IP: bindActionCreators(GET_INTEL_IP, dispatch),
  HIDE_INTEL_IP: bindActionCreators(HIDE_INTEL_IP, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(IpBubbles);
