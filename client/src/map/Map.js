import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import { DeckGL } from 'deck.gl';
import { IconLayer } from '@deck.gl/layers';
import { Grid, Box, Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

import AnimatedArcLayer from './goodies/AnimatedArcLayer';

import attacker from './assests/location.png';
import server from './assests/server-location.svg';

// TODO add to config
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiaGVsbG8xMjMwMDAwIiwiYSI6ImNsMTY5enExbDE1MDQzaW10aXNldHppbm0ifQ.AMRrzL3F4vjcev9lVoXjBw';

const ICON_MAPPING = {
  attacker: { x: 0, y: 0, width: 600, height: 600, mask: false },
  server: { x: 0, y: 0, width: 900, height: 900, mask: true }
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function Map({ width, height, viewState, onViewStateChange, data }) {
  const [open, setOpen] = useState(false);
  const [modaldata, setmodaldata] = useState({});
  const handleOpen = (info) => {
    setmodaldata(info);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [hoverInfo, setHoverInfo] = useState();

  const layers = [
    new AnimatedArcLayer({
      id: `arc-${Date.now()}`,
      data,
      getTargetColor: [255, 0, 0],
      getSourceColor: [255, 0, 0],
      getSourcePosition: (d) => d.coordinates,
      getTargetPosition: () => [61.51225897402009, 55.29779194960553],
      getFrequency: 15,
      animationSpeed: 5,
      tailLength: 5,
      getWidth: 3
    }),
    new IconLayer({
      id: 'attacker icon-layer',
      data,
      pickable: true,
      iconAtlas: attacker,
      iconMapping: ICON_MAPPING,
      getIcon: () => 'attacker',
      sizeScale: 5,
      getPosition: (d) => d.coordinates,
      getSize: 10,
      autoHighlight: true,
      getFillColor: [255, 99, 71],
      onClick: (info) => handleOpen(info.object),
      onHover: (info) => (info.object ? setHoverInfo(info) : setHoverInfo(null))
    }),
    new IconLayer({
      id: 'server icon-layer',
      data,
      pickable: true,
      iconAtlas: server,
      iconMapping: ICON_MAPPING,
      getIcon: () => 'server',
      sizeScale: 5,
      getPosition: () => [61.51225897402009, 55.29779194960553],
      getSize: 10,
      getColor: [255, 255, 255],
      getFillColor: [255, 99, 71],
      autoHighlight: true
    })
  ];
  return (
    <>
      <Box
        sx={{
          background: 'transparent',
          color: 'white'
        }}>
        Key
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
              <img src={attacker} alt="attacker" style={{ height: 40, width: 40 }} />
              <Typography variant="subtitle2" component="div" gutterBottom>
                Attacker Location
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack direction="row" spacing={3}>
              <img
                src={server}
                alt="server"
                style={{
                  height: 50,
                  width: 50
                }}
              />
              <Typography sx={{ pt: 1 }} variant="subtitle2" component="div" gutterBottom>
                Server Location
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <MapGL
        mapStyle="mapbox://styles/mapbox/dark-v10"
        width={width}
        height={height}
        // onLoad={rotateCamera}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGL layers={layers} viewState={viewState} controller>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                HoneyToken Access Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                id: {modaldata._id}
                <br />
                ip: {modaldata.ip}
                <br />
              </Typography>
            </Box>
          </Modal>
          {hoverInfo && (
            <div
              style={{
                position: 'absolute',
                zIndex: 1,
                pointerEvents: 'none',
                left: hoverInfo.x,
                top: hoverInfo.y
              }}>
              {hoverInfo.object.info}
            </div>
          )}
        </DeckGL>
      </MapGL>
    </>
  );
}

Map.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  viewState: PropTypes.object,
  onViewStateChange: PropTypes.func,
  data: PropTypes.array,
  rotateCamera: PropTypes.func
};
export default Map;
// const data = [
//   {
//     sourceAirportId: 'CEK',
//     targetAirportId: 'KZN',
//     sourcePosition: [61.51225897402009, 55.29779194960553],
//     targetPosition: [49.29844580364066, 55.60806014297645],
//     distance: 769.940750599416,
//     routes: 1
//   },
//   {
//     sourceAirportId: 'CEK',
//     targetAirportId: 'OVB',
//     sourcePosition: [61.51225897402009, 55.29779194960553],
//     targetPosition: [82.66715245258652, 55.00958471362636],
//     distance: 1339.27609542061,
//     routes: 2
//   },
//   {
//     sourceAirportId: 'DME',
//     targetAirportId: 'KZN',
//     sourcePosition: [37.90025312894517, 55.41415282230229],
//     targetPosition: [49.29844580364066, 55.60806014297645],
//     distance: 717.190711305859,
//     routes: 4
//   }
// ];
