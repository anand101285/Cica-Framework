import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ADD_ALERT, CLEAR_ALERT } from '../../redux/actions/alert';

const Alert = (props) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(CLEAR_ALERT());
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        open={props.open}
        onClose={handleClose}
        action={action}>
        <MuiAlert
          autoHideDuration={3000}
          onClose={handleClose}
          severity={props.type}
          sx={{ width: '100%' }}>
          {props.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

Alert.propTypes = {
  ADD_ALERT: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  message: state.ALERTSREDUCER.message,
  type: state.ALERTSREDUCER.type,
  open: state.ALERTSREDUCER.open
});

const mapDispatchToProps = (dispatch) => ({
  ADD_ALERT: bindActionCreators(ADD_ALERT, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
