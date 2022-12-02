import React from 'react';
import propTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardHeader, Box } from '@mui/material';

const DonutChart = ({ border, title, height, width, textColor, honeypotData }) => {
  // const data = [
  //   {
  //     id: 'SMB ATTACKS',
  //     label: 'SMB ATTACKS',
  //     value: 306
  //     //   color: 'hsl(163, 70%, 50%)'
  //   },
  //   {
  //     id: 'WEB ATTACKS',
  //     label: 'WEB ATTACKS',
  //     value: 446
  //     //   color: 'hsl(315, 70%, 50%)'
  //   },
  //   {
  //     id: 'SMB SCANS',
  //     label: 'SMB SCANS',
  //     value: 585
  //     //   color: 'hsl(224, 70%, 50%)'
  //   },
  //   {
  //     id: 'WEB SCANS',
  //     label: 'WEB SCANS',
  //     value: 248
  //     //   color: 'hsl(200, 70%, 50%)'
  //   }
  // ];
  return (
    <Card className={border ? 'cs-card' : ''}>
      {title ? <CardHeader title={title} subheader="" /> : null}
      <Box sx={{ mt: 1, height, width }}>
        <ResponsivePie
          data={honeypotData}
          colors={['#1C6758', '#3D8361']}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
          }}
          // enableArcLabels={false}
          arcLinkLabelsStraightLength={2}
          arcLinkLabelsTextColor={textColor}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]]
          }}
        />
        ;
      </Box>
    </Card>
  );
};

DonutChart.propTypes = {
  border: propTypes.bool,
  title: propTypes.string,
  height: propTypes.number,
  width: propTypes.number,
  textColor: propTypes.string,
  honeypotData: propTypes.array
};

export default DonutChart;
