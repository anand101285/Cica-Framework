/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';
import { Card, CardHeader, Box } from '@mui/material';
import { ResponsiveSankey } from '@nivo/sankey';
// ----------------------------------------------------------------------
const SankeyChart = ({ title, data, border, height, width }) => (
  <Card className={border ? 'cs-card' : ''}>
    {title ? <CardHeader title={title} subheader="" /> : null}
    <Box sx={{ height, width }}>
      <ResponsiveSankey
        data={data}
        label={(d) => `${d.techId}`}
        margin={{ top: 10, right: 140, bottom: 20, left: 40 }}
        align="justify"
        isInteractive={true}
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.1}
        colorBy={(node) => node.color}
        nodeThickness={20}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.8]]
        }}
        nodeBorderRadius={3}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient={true}
        nodeTooltip={(node) => (
          <small>
            {node?.node?.techId === 'MITRE ATT&CK'
              ? node?.node?.name
              : `Technique: ${node?.node?.techId} - ${node?.node?.name}`}
            <br />
            {node?.node?.tactics && node?.node?.tactics.length > 0 && `Tactics:`}
            {node?.node?.tactics &&
              node?.node?.tactics.map((tactic, index) => (
                <small key={index}>
                  {tactic} {index < node.node.tactics.length - 1 && ', '}
                </small>
              ))}
            <br />
            {node?.node?.ip && `Adverdsary IP: ${node?.node?.ip}`}
          </small>
        )}
        linkTooltip={(node) => (
          <small>
            {node?.node?.ip && `Adverdsary IP: ${node?.link?.target.ip}`}
            <br />
            {node?.link?.source?.techId &&
              `Source: ${node?.link?.source?.techId}-${node?.link?.source?.name}`}
            <br />
            {node?.link?.source?.techId &&
              `Target: ${node?.link?.target?.techId}-${node?.link?.target?.name}`}
          </small>
        )}
        labelPosition="inside"
        labelOrientation="horizontal"
        labelPadding={24}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 0.8]]
        }}
        animate={true}
        motionStiffness={140}
        motionDamping={13}
        motionConfig="gentle"
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     translateX: 100,
        //     translateY: 20,
        //     itemWidth: 100,
        //     itemHeight: 25,
        //     itemDirection: 'left-to-right',
        //     itemsSpacing: 2,
        //     itemTextColor: '#fff',
        //     symbolSize: 12,
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#fff'
        //         }
        //       }
        //     ]
        //   }
        // ]}
      />
    </Box>
  </Card>
);

SankeyChart.propTypes = {
  title: propTypes.string,
  data: propTypes.object,
  border: propTypes.bool,
  height: propTypes.number,
  width: propTypes.number
};

export default SankeyChart;
