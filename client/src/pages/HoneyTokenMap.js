import { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { LinearInterpolator } from '@deck.gl/core';

// material
import { Container, Grid, Card, Stack, Typography } from '@mui/material';

// componentss
import Page from '../components/Page';
import Loader from '../components/Loader';
import { GET_ATTACKER_LOCATION } from '../redux/actions/map';

import Map from '../map/Map';

const INITIAL_VIEW_STATE = {
  latitude: -23.789851642104544,
  longitude: 62.1009488602668,
  zoom: 1.5,
  pitch: 54.24055960479147,
  bearing: 0.13177159590043908
};

const HoneytokenMap = (props) => {
  const { getAttackerLocation, mapData, userData } = props;

  const [isLoading, setisLoading] = useState(true);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const handleChangeViewState = ({ viewState: newViewState }) => setViewState(newViewState);
  const [mapdata, setmapdata] = useState(null);

  const transitionInterpolator = useMemo(() => new LinearInterpolator(), []);
  // const transitionInterpolator = new LinearInterpolator();
  const rotateCamera = useCallback(() => {
    setViewState((newViewState) => ({
      ...newViewState,
      bearing: newViewState.bearing + 360,
      transitionDuration: 50000,
      transitionInterpolator,
      onTransitionEnd: rotateCamera
    }));
  }, [transitionInterpolator]);

  useEffect(() => {
    getAttackerLocation(userData.userId);
  }, [getAttackerLocation, userData.userId]);

  useEffect(() => {
    const getlocations = () => {
      const location = [];
      if (mapData) {
        mapData?.forEach((docs) => {
          docs.attackersdata.forEach((data) => {
            location.push(data);
          });
        });
        setmapdata(location);
      }
    };
    if (mapData && mapData?.length !== 0) {
      getlocations();
      setisLoading(false);
    }
  }, [setisLoading, mapData]);

  return (
    <>
      <Page title="Dashboard: Blog | Minimal-UI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" gutterBottom>
              Track Beacons
            </Typography>
          </Stack>
          {isLoading === true && <Loader />}
          {isLoading === false && (
            <Grid container spacing={3}>
              <Card className="graph-card">
                <Grid item xs={12} lg={12}>
                  {mapdata !== null && (
                    <Map
                      width="100vw"
                      height="80vh"
                      viewState={viewState}
                      onViewStateChange={handleChangeViewState}
                      data={mapdata}
                      rotateCamera={rotateCamera}
                    />
                  )}
                </Grid>
              </Card>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
};

HoneytokenMap.propTypes = {
  getAttackerLocation: PropTypes.func.isRequired,
  mapData: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  mapData: state.MAPREDUCER.attackerdata,
  userData: state.AUTHREDUCER.user
});

const mapDispatchToProps = (dispatch) => ({
  getAttackerLocation: bindActionCreators(GET_ATTACKER_LOCATION, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(HoneytokenMap);
