import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import SankeyChart from '../../components/_dashboard/app/SankeyChart';
import ForceGraph from './forceGraph';

// const data2 = {
//   nodes: [
//     {
//       id: 1111,
//       name: 'Active Scanning',
//       ip: '101.50.112.147',
//       techId: 'T1595',
//       tactics: ['TA0043']
//     },
//     {
//       id: 1112,
//       name: 'Establish Accounts',
//       ip: '101.50.112.147',
//       techId: 'T1585',
//       tactics: ['TA0042']
//     },
//     {
//       id: 1113,
//       name: 'Container Administration Command',
//       ip: '101.50.112.147',
//       techId: 'T1609',
//       tactics: ['TA0002']
//     },
//     {
//       id: 1114,
//       name: 'Compromise Accounts',
//       ip: '101.50.112.147',
//       techId: 'T1586',
//       tactics: ['TA0042']
//     },
//     {
//       id: 1115,
//       name: 'Boot or Logon Autostart Execution',
//       ip: '101.50.112.147',
//       techId: 'T1547',
//       tactics: ['TA0003', 'TA0004']
//     },
//     {
//       id: 1116,
//       name: 'External Remote Services',
//       ip: '13.235.48.247',
//       techId: 'T1133',
//       tactics: ['TA0001', 'TA0003']
//     },
//     {
//       id: 1117,
//       name: 'Account Manipulation',
//       ip: '13.235.48.247',
//       techId: 'T1098',
//       tactics: ['TA0003']
//     },
//     {
//       id: 1118,
//       name: 'Active Scanning',
//       ip: '101.50.112.147',
//       techId: 'T1595',
//       tactics: ['TA00455']
//     }
//   ],
//   links: [
//     {
//       source: 1111,
//       target: 1112
//     },
//     {
//       source: 1112,
//       target: 1113
//     },
//     {
//       source: 1113,
//       target: 1114
//     },
//     {
//       source: 1114,
//       target: 1115
//     },
//     {
//       source: 1114,
//       target: 1116
//     },
//     {
//       source: 1116,
//       target: 1117
//     },
//     {
//       source: 1117,
//       target: 1118
//     }
//   ]
// };

const AttackPaths = ({ allAttackPaths }) => {
  return (
    <>
      <Grid container spacing={4} style={{ marginTop: '10px' }}>
        <Grid item sm={12} lg={12}>
          <ForceGraph data={allAttackPaths} />
        </Grid>
        <Grid item sm={12} lg={12}>
          <SankeyChart title={'  '} data={allAttackPaths} border={true} height={500} widh={100} />
        </Grid>
      </Grid>
    </>
  );
};

AttackPaths.propTypes = {
  allAttackPaths: PropTypes.object
};

export default AttackPaths;
