import React from 'react';
import propTypes from 'prop-types';
// material
import { Card, CardHeader, Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

// ----------------------------------------------------------------------

const LineChart = ({ title, data }) => (
  <Card className="cs-card">
    <CardHeader title={title} subheader="" />
    <Box sx={{ p: 3, pb: 1, height: '300px' }} dir="ltr">
      <ResponsiveLine
        data={data}
        margin={{ top: 6, right: 6, bottom: 70, left: 60 }}
        enablePoints
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        theme={{
          textColor: '#ffffff',
          axis: {
            domain: {
              line: {
                stroke: '#777777',
                strokeWidth: 1
              }
            }
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 12
            }
          },
          crosshair: {
            line: {
              stroke: '#ffffff',
              strokeWidth: 1,
              strokeOpacity: 0.35
            }
          }
        }}
        enableGridY={false}
        enableGridX={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -40,
          legend: 'Timestamps',
          legendOffset: 60,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of attacks',
          legendOffset: -55,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'category10' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
      />
    </Box>
  </Card>
);

LineChart.propTypes = {
  title: propTypes.string,
  data: propTypes.array
};

export default LineChart;
