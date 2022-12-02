import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  // Avatar, Typography,
  Divider
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// import account from '../../_mocks_/account';
import sidebarConfig from './SidebarConfig';
import NavSection from 'src/components/NavSection';

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

// const AccountStyle = styled('box')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   alignSelf: 'center',
//   marginTop: '8%',
//   borderRadius: theme.shape.borderRadiusS
// }));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const DashboardDrawer = ({ isSidebarOpen, onCloseSidebar }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isSidebarOpen}>
        <DrawerHeader>
          <IconButton onClick={onCloseSidebar}>
            {theme.direction !== 'rtl' && <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* {isSidebarOpen && ( */}
        {/* <Box sx={{ my: 2.5, mx: 1.75 }}>
          <Link
            underline="none"
            // component={RouterLink}
            to="#"
            style={{ background: 'transparent' }}>
            <AccountStyle>
              <Avatar src={account.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {`${user.f_name} ${user.l_name}`}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
          <Divider style={{ paddingTop: '10%' }} />
        </Box> */}
        {/* )} */}
        <NavSection navConfig={sidebarConfig} />
      </Drawer>
    </Box>
  );
};

DashboardDrawer.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.AUTHREDUCER.user
});

export default connect(mapStateToProps, null)(DashboardDrawer);
