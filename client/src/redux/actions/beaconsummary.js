import * as types from '../constants';
import { api } from '../../services/api';
import axios from 'axios';
import { APP_URL } from '../../config';
import { ADD_ALERT } from './alert';

export const GET_BEACON_SUMMARY_DATA = (userId) => {
  const action = {
    url: `/database/token/compromised/${userId}`,
    types: [types.GET_BEACON_SUMMARY_DATA_SUCCESS, types.GET_BEACON_SUMMARY_DATA_FAILURE]
  };
  return api.get(action);
};

export const CHANGE_ACCESSIBILTY_OF_TOKEN = (userId, accessible, tokenId) => (dispatch) => {
  const body = {
    accessible,
    tokenId
  };
  axios({
    url: `${APP_URL}/honeytoken/settings/change_assessibility`,
    method: 'POST',
    data: body
  }).then((res) => {
    if (res.data.msg === 'Update Successfully') {
      dispatch(ADD_ALERT('Token Accessibility Changed', 'success'));
      dispatch(GET_BEACON_SUMMARY_DATA(userId));
    } else {
      dispatch(ADD_ALERT('Token Accessibility Change failed', 'error'));
    }
  });
};

export const DELETE_TOKEN = (userId, tokenId) => (dispatch) => {
  const body = {
    tokenId,
    userId
  };
  axios({
    url: `${APP_URL}/honeytoken/settings/deleteToken`,
    method: 'DELETE',
    data: body
  }).then((res) => {
    if (res.data.status === 1) {
      dispatch(ADD_ALERT(res.data.msg, 'success'));
      dispatch(GET_BEACON_SUMMARY_DATA(userId));
    } else if (res.data.status === 0) {
      dispatch(ADD_ALERT(res.data.msg, 'error'));
      dispatch(GET_BEACON_SUMMARY_DATA(userId));
    } else {
      dispatch(ADD_ALERT('Unknown Error from Backend', 'error'));
    }
  });
};
