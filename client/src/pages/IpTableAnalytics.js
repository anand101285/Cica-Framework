// import axios from 'axios';
// import { useEffect, useState } from 'react';

// // material
// import { Box, Grid, Container, Typography } from '@mui/material';
// // components
// import Page from '../components/Page';
// import Loader from '../components/Loader';

// import IPProfile from '../components/_dashboard/honeypot/IPProfile';

// // import { BarChart } from '../components/_dashboard/app';

// const config = require('../config');
// // ----------------------------------------------------------------------

// export default function IpTableAnalytics() {
//   const [Ipinteractions, setIpinteractions] = useState({});
//   const [Ipscans, setIpscans] = useState({});
//   const [IpProfile, setIpProfile] = useState([]);
//   const [isLoading, setisLoading] = useState(false);

//   useEffect(() => {
//     getgraphdata();
//     getTableData();
//   }, []);

//   const getgraphdata = async () => {
//     setisLoading(true);
//     try {
//       const Interactions = await axios({
//         url: `${config.APP_URL}/elasticsearch/iptables_requests/countries/access/interaction`,
//         method: 'GET'
//       });
//       setIpinteractions(Interactions.data);
//       const scan = await axios({
//         url: `${config.APP_URL}/elasticsearch/iptables_requests/countries/access/scan`,
//         method: 'GET'
//       });
//       setIpscans(scan.data);
//       setisLoading(false);
//     } catch (err) {
//       console.log('error loading the graph data', err);
//     }
//   };

//   const getTableData = async () => {
//     try {
//       const ipdata = await axios({
//         url: `${config.APP_URL}/elasticsearch/dionaea/all_interaction_ip`,
//         method: 'GET'
//       });
//       setIpProfile(ipdata.data);
//     } catch (err) {
//       console.log('error loading the table data', err);
//     }
//   };
//   return (
//     <Page title="Honeypots">
//       <Container maxWidth="xl">
//         <Box sx={{ pb: 5 }}>
//           <Typography variant="h4">IP TABLE Analytics</Typography>
//         </Box>
//         {isLoading === true && <Loader />}
//         {isLoading === false &&
//           Object.keys(Ipinteractions).length !== 0 &&
//           Object.keys(Ipscans).length !== 0 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={3} lg={6}>
//                 {/* <BarChart
//                   title="IP TABLE Interactions"
//                   labels={Ipinteractions.countries}
//                   data1={Ipinteractions.count}
//                 /> */}
//               </Grid>
//               <Grid item xs={12} md={3} lg={6}>
//                 {/* <BarChart title="IP SCANS" labels={Ipscans.countries} data1={Ipscans.count} /> */}
//               </Grid>
//               <Grid item xs={12} lg={12}>
//                 {IpProfile.length !== 0 && <IPProfile rows={IpProfile} />}
//               </Grid>
//             </Grid>
//           )}
//       </Container>
//     </Page>
//   );
// }
