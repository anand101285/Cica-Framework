import axios from 'axios';
import { APP_URL } from '../../config';
import {
  GET_IP_NMAP_DETAILS,
  START_NMAP_SCAN,
  STOP_INTEL_GATHERING,
  STOP_NMAP_SCAN,
  START_INTEL_GATHERING,
  GET_INTEL_DETAILS,
  CLEAR_MEMORY
} from '../constants';
import { ADD_ALERT } from './alert';

export const GET_NMAP_DATA_ATTACKER =
  (ip, port = '1-4000') =>
  (dispatch) => {
    const body = {
      target: ip,
      port
    };
    dispatch({ type: START_NMAP_SCAN });
    axios({
      url: `${APP_URL}/attacker/run-nmap`,
      method: 'POST',
      data: body
    }).then((res) => {
      if (res.data.status === 1) {
        dispatch({ type: GET_IP_NMAP_DETAILS, payload: { ip, data: res.data.data } });
        dispatch(ADD_ALERT('Nmap Scan Done', 'success'));
      } else {
        dispatch({ type: STOP_NMAP_SCAN });
        dispatch(ADD_ALERT('Nmap Scan Failed', 'error'));
      }
    });
  };

export const GET_INTEL_IP = (ip) => (dispatch) => {
  const body = {
    ip
  };
  dispatch({ type: START_INTEL_GATHERING });
  axios({
    url: `${APP_URL}/attacker/get-intel`,
    method: 'POST',
    data: body
  }).then((res) => {
    if (res.data.status === 1) {
      dispatch({
        type: GET_INTEL_DETAILS,
        payload: {
          data: res.data.data
        }
      });
    } else {
      dispatch({ type: STOP_INTEL_GATHERING });
      dispatch(ADD_ALERT('Intel Fetching of Current Ip Failed', 'error'));
    }
  });
};

export const HIDE_INTEL_IP = () => (dispatch) => {
  dispatch({ type: STOP_INTEL_GATHERING });
};

export const CLEAR_DATA = () => (dispatch) => {
  dispatch({ type: CLEAR_MEMORY });
};
