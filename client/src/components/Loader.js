import React from 'react';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';
// components
import animationData from './_dashboard/animation/loader.json';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
    <Lottie animationData={animationData} style={{ height: 300, width: 300 }} />
  </Box>
);

export default Loader;
