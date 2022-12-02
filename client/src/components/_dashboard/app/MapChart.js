import React from 'react';
import propTypes from 'prop-types';
import { ResponsiveChoropleth } from '@nivo/geo';

import { Card, CardHeader, Box } from '@mui/material';

import { feature } from './features';

const MapChart = ({ title, data, border, height, width, itemTextColor }) => (
  <Card className={border ? 'cs-card' : ''}>
    {title ? <CardHeader title={title} subheader="" /> : null}
    <Box sx={{ mt: 1, height, width }}>
      <ResponsiveChoropleth
        data={data}
        features={feature}
        margin={{ top: 90, right: 0, bottom: 0, left: 0 }}
        // colors="nivo"
        colors={['#ff584d', '#ff4133', '#ff291a', '#ff1100', '#e60f00', '#cc0e00', '#b30c00']}
        domain={[0, 30532]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={100}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[-10, 0, 0]}
        borderWidth={1.5}
        borderColor="#152538"
        theme={{
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 12
            }
          }
        }}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 15,
            translateY: -120,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor,
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#e69d9df7',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </Box>
  </Card>
);

MapChart.propTypes = {
  data: propTypes.array.isRequired,
  title: propTypes.string,
  border: propTypes.bool,
  height: propTypes.number,
  width: propTypes.number,
  itemTextColor: propTypes.string
};

export default MapChart;
