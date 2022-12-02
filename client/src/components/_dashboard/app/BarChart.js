/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
// ----------------------------------------------------------------------

const BarChart = ({
  title,
  data,
  indexBy,
  datakey,
  xtitle,
  ytitle,
  height,
  width,
  border,
  textColor,
  top
}) => (
  <Card className={border ? 'cs-card' : ''}>
    {title ? <CardHeader title={title} subheader="" /> : null}
    <Box sx={{ height, width }}>
      <ResponsiveBar
        data={data}
        keys={datakey}
        indexBy={indexBy}
        margin={{ top, right: 0, bottom: 70, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        theme={{
          textColor,
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
          }
        }}
        colors={['#1C6758', '#3D8361']}
        colorBy="index"
        borderColor={{
          from: 'color',
          modifiers: [['darker', 3]]
        }}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -34,
          legend: xtitle,
          legendPosition: 'middle',
          legendOffset: 60
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: ytitle,
          legendPosition: 'middle',
          legendOffset: -60
        }}
        enableLabel={false}
      />
    </Box>
  </Card>
);

BarChart.propTypes = {
  title: propTypes.string,
  data: propTypes.array,
  xtitle: propTypes.string,
  ytitle: propTypes.string,
  height: propTypes.number,
  width: propTypes.number,
  border: propTypes.bool,
  textColor: propTypes.string,
  top: propTypes.number,
  datakey: propTypes.array,
  indexBy: propTypes.string
};

export default BarChart;
