import React from 'react';

// honeytoken manual build component import
import GenerateHoneytoken from 'src/components/generateHoneytoken/generateHoneytoken';

// mui components import
import { Container, Typography } from '@mui/material';
import Page from 'src/components/Page';

// honeytoken data  from file
import { honeytokens } from 'src/docs/honeytokenDocs';

const NewBeacon = () => {
  return (
    <>
      <Page title="Dashboard: Generate Beacons">
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            New Beacon
          </Typography>
          <GenerateHoneytoken honeytokens={honeytokens} />
        </Container>
      </Page>
    </>
  );
};

export default NewBeacon;
