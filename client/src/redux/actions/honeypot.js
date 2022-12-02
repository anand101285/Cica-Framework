import * as types from '../constants';
import { api } from '../../services/api';

export const GET_HONEYPOT_DETAILS = (userId) => {
  const action = {
    url: `/honeypot/honeypot_machine/${userId}`,
    types: [
      types.GET_DASHBOARD_HONEYPOT_MACHINE_DATA_SUCCESS,
      types.GET_DASHBOARD_HONEYPOT_MACHINE_DATA_FAILURE
    ]
  };
  return api.get(action);
};
