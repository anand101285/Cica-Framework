import React, { useState } from 'react';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, get } from 'ol/proj';

// material
import { Container, Stack, Typography } from '@mui/material';

import Map from '../maps/Map';
import { Layers, TileLayer, VectorLayer } from '../maps/Layers';
import { osm, vector } from '../maps/Source';

import mapConfig from '../maps/config.json';
import '../maps/maps.css';

// components
import Page from '../components/Page';

const markersLonLat = [
  [73.135, 31.4504],
  [74.3587, 31.5204],
  [70.9019, 31.8626]
];

function addMarkers(lonLatArray) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: mapConfig.markerImage32
    })
  });
  const features = lonLatArray.map((item) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item))
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

// ----------------------------------------------------------------------

export default function Blog() {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(5);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Track Beacons
          </Typography>
        </Stack>
        <div>
          <Map center={fromLonLat(center)} zoom={zoom}>
            <Layers>
              <TileLayer source={osm()} zIndex={0} />
              <VectorLayer source={vector({ features })} />
            </Layers>
          </Map>
        </div>
      </Container>
    </Page>
  );
}
