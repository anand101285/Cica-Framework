import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// components
import { MHidden } from '../../components/@material-extend';
import { CloudDownload } from '../../icons/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//
import AccountPopover from './AccountPopover';
import ReportPopover from './ReportPopover';
import { DOWNLOAD_AGENT } from '../../redux/actions/newbeacon';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 220;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

// ----------------------------------------------------------------------

const DashboardNavbar = ({ isSidebarOpen, setOpen, downloadAgent }) => {
  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 1),
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('xl')]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    },
    ...(isSidebarOpen && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('xl')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
  }));
  return (
    <RootStyle open={isSidebarOpen}>
      <ToolbarStyle>
        <MHidden width="xlUp">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              mr: 1,
              color: 'text.primary',
              marginRight: 5,
              ...(isSidebarOpen && { display: 'none' })
            }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Typography variant="p">Agent Download</Typography>
          <IconButton
            aria-label="Example"
            variant="outlined"
            onClick={() => {
              downloadAgent();
            }}>
            <Icon icon={CloudDownload} color="white" />
          </IconButton>
          <ReportPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

DashboardNavbar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  downloadAgent: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  downloadAgent: bindActionCreators(DOWNLOAD_AGENT, dispatch)
});
export default connect(null, mapDispatchToProps)(DashboardNavbar);
