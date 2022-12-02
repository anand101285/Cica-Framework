import axios from 'axios';
import { APP_URL } from '../../config';
import { GET_ATTACKER_TOKENS } from '../constants';
import { ADD_ALERT } from './alert';

export const GET_ALL_ATTACKER_TOKEN = (ip) => (dispatch) => {
  axios({
    url: `${APP_URL}/database/attacker/get-all-tokens`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: { ip }
  }).then((res) => {
    if (res.data.status === 1) {
      dispatch({
        type: GET_ATTACKER_TOKENS,
        payload: {
          data: res.data.data,
          ip
        }
      });
    } else {
      dispatch(ADD_ALERT('Token Information of attacker Failed to Get', 'error'));
    }
  });
};
