import React from 'react';
import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = ({ sx }) => {
  return <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />;
};

Logo.propTypes = {
  sx: PropTypes.object
};

export default Logo;
