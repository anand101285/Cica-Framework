import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { Icon } from '@iconify/react';
import filePdfOutlined from '@iconify/icons-ant-design/file-pdf-outlined';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { MenuItem, Button } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

import { USER_LOGOUT } from '../../redux/actions/user';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Generate Honeypot Report',
    icon: filePdfOutlined,
    linkTo: '/dashboard/generatepdf'
  },
  {
    label: 'Generate Beacon Report',
    icon: filePdfOutlined,
    linkTo: '/dashboard/generateBeaconpdf'
  }
];

// ----------------------------------------------------------------------

const ReportPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleOpen}
        variant="outlined"
        color="secondary"
        sx={{
          padding: '2px 10px',
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '10%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}>
        Generate Reports
      </Button>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}>
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}>
            {/* <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 44,
                height: 44
              }}
            /> */}

            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
};

ReportPopover.propTypes = {
  USER_LOGOUT: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.AUTHREDUCER.user
});

const mapDispatchToProps = (dispatch) => ({
  USER_LOGOUT: bindActionCreators(USER_LOGOUT, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportPopover);
