import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// material
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Box, Grid, Input, InputAdornment, Button } from '@mui/material';
// components
import Page from '../components/Page';
import IpBubbles from '../components/ip_visuals/ipBubbles';
import Loader from '../components/Loader';

import { GET_IPS } from '../redux/actions/ipprofiling';
import { HIDE_INTEL_IP } from '../redux/actions/attackerInfo';

const APPBAR_MOBILE = 44;
const APPBAR_DESKTOP = 64;

const SearchbarStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

const IpProfiling = (props) => {
  const [ipProfiling, setIpProfiling] = useState();
  const [showIps, setShowIps] = useState(true);
  const [allProfilingIps, setAllProfilingIps] = useState(props.allIps);

  useEffect(() => {
    if (props.allIps && props.allIps.length === 0) {
      props.GET_IPS();
    }
    if (allProfilingIps?.length === 0) {
      setAllProfilingIps(props.allIps);
    }
  }, [
    props,
    props.allIps,
    props.GET_IPS,
    props.ipDataLoading,
    allProfilingIps,
    setAllProfilingIps
  ]);

  const handleOnSearch = (e) => {
    const searchFilter = e.target.value && e.target.value.toLowerCase();
    let searchOption = [];

    searchOption =
      props.allIps &&
      props.allIps.filter((item) =>
        Object.keys(item).some(
          (key) =>
            typeof item[key] === 'string' &&
            item[key] &&
            item[key].toLowerCase().includes(searchFilter)
        )
      );

    if (searchOption) {
      setAllProfilingIps(searchOption);
    } else {
      setAllProfilingIps(props.allIps);
    }
  };

  return (
    <Page title="IP Profiling">
      <Container maxWidth="xl">
        <Box
          sx={{
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            overflowX: 'hidden',
            maxWidth: '100%'
          }}>
          <Typography variant="h4">
            IP Profiling {ipProfiling && ipProfiling.ip && `: ${ipProfiling.ip}`}
          </Typography>
          {showIps ? (
            <Box sx={{ pb: 2 }}>
              <SearchbarStyle>
                <Input
                  autoFocus
                  fullWidth
                  onChange={(e) => handleOnSearch(e)}
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{ color: 'text.disabled', width: 15, height: 15 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                />
                <Button className="blue-button" variant="outlined" sx={{ padding: '2px 10px' }}>
                  Search
                </Button>
              </SearchbarStyle>
            </Box>
          ) : (
            <Button
              size="large"
              className="blue-button"
              variant="outlined"
              onClick={() => {
                setShowIps(true);
                setIpProfiling({});
                props.HIDE_INTEL_IP();
              }}>
              Go Back
            </Button>
          )}
        </Box>
        {props.ipDataLoading === true ? (
          <Loader />
        ) : props.allIps.length === 0 ? (
          <>
            <Typography variant="h3" align="center">
              No Data
            </Typography>
          </>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <IpBubbles
                  allProfilingIps={allProfilingIps}
                  showIps={showIps}
                  setShowIps={setShowIps}
                  ipProfiling={ipProfiling}
                  setIpProfiling={setIpProfiling}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
};

IpProfiling.propTypes = {
  GET_IPS: PropTypes.func.isRequired,
  HIDE_INTEL_IP: PropTypes.func.isRequired,
  allIps: PropTypes.array,
  ipDataLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  allIps: state.IPPROFILINGREDUCER.allIps,
  ipDataLoading: state.IPPROFILINGREDUCER.ipDataLoading
});

const mapDispatchToProps = (dispatch) => ({
  GET_IPS: bindActionCreators(GET_IPS, dispatch),
  HIDE_INTEL_IP: bindActionCreators(HIDE_INTEL_IP, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IpProfiling);
