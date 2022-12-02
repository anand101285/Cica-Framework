import React from 'react';
import propTypes from 'prop-types';
import Tree from 'react-d3-tree';
import { useCenteredTree } from './treeHelpers';
import './d3Tree.css';

const containerStyles = {
  width: '100vw',
  height: '100vh'
};

const ReactD3Tree = ({ ipProfiling }) => {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 150, y: 150 };
  const chartData = {
    name: ipProfiling?.ip,
    children: [
      {
        name: `Org: ${ipProfiling?.details?.org || '-'}`,
        children: [
          {
            name: 'Geo',
            children: [
              {
                name: `City: ${ipProfiling?.details?.geo?.city || '-'}`
              },
              {
                name: `Country: ${ipProfiling?.details?.geo?.country || '-'}`
              },
              {
                name: `State: ${ipProfiling?.details?.geo?.state || '-'}`
              }
            ]
          },
          {
            name: `Spam Level: ${ipProfiling?.details?.spam_level || '-'}`
          },
          {
            name: `Thread Level: ${ipProfiling?.details?.thread_level || '-'}`
          },
          {
            name: `Hash: ${ipProfiling?.ipProfile?.hash || '-'}`,
            children: [
              {
                name: 'Other IPs',
                children: ipProfiling?.ipProfile?.other_ips?.map((oIps) => ({
                  name: oIps
                }))
              }
            ]
          }
        ]
      }
    ]
  };

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect width="20" height="20" x="-10" onClick={toggleNode} />
      <text
        fill="black"
        strokeWidth="1"
        x="20"
        dy="20"
        fontSize="13"
        fontWeight="300"
        fontFamily="sans serif">
        {nodeDatum.name}
      </text>
      {nodeDatum &&
        nodeDatum.children &&
        nodeDatum.children.map((item, index) => (
          <text fill="black" x="20" dy="20" strokeWidth="1" key={index}>
            {item &&
              item?.attributes &&
              Object.keys(item?.attributes).map((att, i) => (
                <>
                  <text fill="black" x="20" dy="20" strokeWidth="1" key={i}>
                    {att}:
                  </text>
                  <text fill="black" x="20" dy="20" strokeWidth="1" key={i}>
                    <br /> {item.attributes[att]}
                  </text>
                </>
              ))}
          </text>
        ))}
    </g>
  );

  return (
    <div id="treeWrapper" style={containerStyles} ref={containerRef}>
      <Tree
        data={chartData}
        translate={translate}
        nodeSize={nodeSize}
        renderCustomNodeElement={renderRectSvgNode}
        // renderCustomNodeElement={(rd3tProps) =>
        //   renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        // }
        orientation="vertical"
      />
    </div>
  );
};

ReactD3Tree.propTypes = {
  ipProfiling: propTypes.object
};

export default ReactD3Tree;
