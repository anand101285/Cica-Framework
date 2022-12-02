import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Card } from '@mui/material';
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from 'three-spritetext';

const nodes = [];
nodes['Active Scanning'] = '#8B0707';
nodes['Compromise Accounts'] = '#078B79';
nodes['Drive By Compromise'] = '#07478B';
nodes['Deploy Container'] = '#1F078B';
nodes['Valid Accounts'] = '#4F078B';
nodes['Scheduled Task/Job'] = '#898B07';
nodes['Establish Accounts'] = '#3B8B07';
nodes['Container Administration Command'] = '#078B2D';
nodes['Boot or Logon Autostart Execution'] = '#078B71';
nodes['External Remote Services'] = '#075B8B';
nodes['Account Manipulation'] = '#8B4107';

const ForceGraph = ({ data }) => {
  const fgRef = useRef({});

  const handleClick = useCallback(
    (node) => {
      // Aim at node from outside it
      const distance = 100;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000 // ms transition duration
      );
    },
    [fgRef]
  );

  return (
    <Card className="cs-card">
      <ForceGraph3D
        ref={fgRef}
        backgroundColor="rgba(30, 60, 85, 0.26)"
        graphData={data}
        nodeLabel={(node) =>
          node.name !== 'MITRE ATT&CK' && `Technique: ${node.techId}-${node.name}, IP: ${node.ip}`
        }
        nodeColor={(d) => nodes[d.name]}
        nodeResolution={20}
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(`${node.name}`);
          sprite.color = 'lightgrey';
          sprite.textHeight = 3;
          return sprite;
        }}
        // linkDirectionalParticles="value"
        // linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        linkDirectionalParticleColor={() => 'gray'}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticles={15}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={0.5}
        linkCurvature={0}
        onNodeClick={handleClick}
        linkThreeObjectExtend={true}
        linkThreeObject={(link) => {
          // extend link with text sprite
          const sprite = new SpriteText(
            `${
              link &&
              link.source &&
              link.source.toString() &&
              link.source.toString().split('-') &&
              link.source.toString().split('-')[2]
            } ===> 
            ${
              link &&
              link.target &&
              link.target.toString() &&
              link.target.toString().split('-') &&
              link.target.toString().split('-')[2]
            }`
          );
          sprite.color = 'lightgrey';
          sprite.textHeight = 1.5;
          return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }) => {
          const middlePos = Object.assign(
            ...['x', 'y', 'z'].map((c) => ({
              [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
            }))
          );

          // Position sprite
          Object.assign(sprite.position, middlePos);
        }}
      />
    </Card>
  );
};

ForceGraph.propTypes = {
  data: PropTypes.object
};

export default ForceGraph;
