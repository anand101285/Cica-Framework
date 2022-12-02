import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Card, CardHeader, Box } from '@mui/material';

const CalanderChart = () => {
  const data = {
    name: 'AJ Machine',
    color: 'hsl(330, 70%, 50%)',
    children: [
      {
        name: 'text',
        color: 'hsl(112, 70%, 50%)',
        children: [
          {
            name: 'trim',
            color: 'hsl(335, 70%, 50%)',
            loc: 150437
          },
          {
            name: 'slugify',
            color: 'hsl(118, 70%, 50%)',
            loc: 149015
          },
          {
            name: 'snakeCase',
            color: 'hsl(203, 70%, 50%)',
            loc: 99610
          },
          {
            name: 'camelCase',
            color: 'hsl(131, 70%, 50%)',
            loc: 184140
          },
          {
            name: 'repeat',
            color: 'hsl(115, 70%, 50%)',
            loc: 26192
          },
          {
            name: 'padLeft',
            color: 'hsl(146, 70%, 50%)',
            loc: 48335
          },
          {
            name: 'padRight',
            color: 'hsl(26, 70%, 50%)',
            loc: 61134
          },
          {
            name: 'sanitize',
            color: 'hsl(22, 70%, 50%)',
            loc: 152104
          },
          {
            name: 'ploucify',
            color: 'hsl(70, 70%, 50%)',
            loc: 106136
          }
        ]
      },
      {
        name: 'SMB Honeypot',
        color: 'hsl(172, 70%, 50%)',
        children: [
          {
            name: 'Interactions',
            color: 'hsl(317, 70%, 50%)',
            children: [
              {
                name: 'hey',
                color: 'hsl(84, 70%, 50%)',
                loc: 69255
              }
            ]
          },
          {
            name: 'other',
            color: 'hsl(105, 70%, 50%)',
            loc: 99487
          },
          {
            name: 'Scans',
            color: 'hsl(135, 70%, 50%)',
            children: [
              {
                name: 'pathB',
                color: 'hsl(24, 70%, 50%)',
                children: [
                  {
                    name: 'pathB1',
                    color: 'hsl(286, 70%, 50%)',
                    loc: 163130
                  }
                ]
              },
              {
                name: 'pathC',
                color: 'hsl(11, 70%, 50%)',
                children: [
                  {
                    name: 'pathC1',
                    color: 'hsl(6, 70%, 50%)',
                    loc: 120289
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <Card className="cs-card">
      <CardHeader title="Attack Monthly Details" subheader="" />
      <Box sx={{ mt: 1, height: '400px' }}>
        <ResponsiveTreeMap
          // tile="binary"
          data={data}
          identity="name"
          value="loc"
          valueFormat=".02s"
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          colors={{ scheme: 'dark2' }}
          nodeOpacity={1}
          labelSkipSize={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.2]]
          }}
          orientLabel={false}
          parentLabelPosition="left"
          parentLabelTextColor={{
            from: 'color',
            modifiers: [['darker', 2]]
          }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.1]]
          }}
        />
      </Box>
    </Card>
  );
};

export default CalanderChart;
