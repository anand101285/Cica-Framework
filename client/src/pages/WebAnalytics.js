import axios from 'axios';
import { useEffect, useState } from 'react';

// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Loader from '../components/Loader';

import { BarChart } from '../components/_dashboard/app';

const config = require('../config');
// ----------------------------------------------------------------------

export default function WebAnalytics() {
  const [webIpData, setwebIpData] = useState({});
  const [webPayloads, setwebPayloads] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getgraphdata = async () => {
      setisLoading(true);
      try {
        const webIp = await axios({
          url: `${config.APP_URL}/elasticsearch/web/attackerIp`,
          method: 'GET'
        });
        setwebIpData(webIp.data);
        const webpayload = await axios({
          url: `${config.APP_URL}/elasticsearch/web_requests/payloads/count`,
          method: 'GET'
        });
        setwebPayloads(webpayload.data);
        setisLoading(false);
      } catch (err) {
        setisLoading(false);
      }
    };
    return getgraphdata();
  }, [setisLoading, setwebPayloads, setwebIpData]);

  return (
    <Page title="Honeypots">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">WEB Analytics</Typography>
        </Box>
        {isLoading === true && <Loader />}
        {isLoading === false &&
          Object.keys(webIpData).length !== 0 &&
          Object.keys(webPayloads).length !== 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <BarChart
                  title="WEB Attacker IP"
                  data={webIpData}
                  datakey={['doc_count']}
                  indexBy={'key'}
                  ytitle={'Number of Attacks'}
                  xtitle={'IP Address'}
                  border={true}
                  height={300}
                  textColor={'#ffffffff'}
                  top={30}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <BarChart
                  title="WEB Attacker Payload"
                  data={webPayloads}
                  datakey={['doc_count']}
                  indexBy={'key'}
                  ytitle={'Number of Attacks'}
                  xtitle={'Payload'}
                  border={true}
                  height={300}
                  textColor={'#ffffffff'}
                  top={30}
                />
              </Grid>
            </Grid>
          )}
      </Container>
    </Page>
  );
}
