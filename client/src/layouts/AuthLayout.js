import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
import Logo from '../components/Logo';
//
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------
const AuthLayout = ({ children }) => {
  return (
    <HeaderStyle>
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <MHidden width="lgDown">
        <Typography
          variant="body2"
          sx={{
            mt: { md: -2 }
          }}>
          {children}
        </Typography>
      </MHidden>
    </HeaderStyle>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default AuthLayout;
