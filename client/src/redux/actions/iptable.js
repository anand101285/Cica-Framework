import * as types from '../constants';
import { api } from '../../services/api';

export const GET_IP_TABLE_INTERACTIONS = () => {
  const action = {
    url: '/elasticsearch/iptables_requests/countries/access/interaction',
    types: [types.GET_IP_TABLE_INTERACTIONS_SUCCESS, types.GET_IP_TABLE_INTERACTIONS_FAILURE]
  };
  return api.get(action);
};

export const GET_IP_TABLE_SCANS = () => {
  const action = {
    url: `/elasticsearch/iptables_requests/countries/access/scan`,
    types: [types.GET_IP_TABLE_SCANS_SUCCESS, types.GET_IP_TABLE_SCANS_FAILURE]
  };
  return api.get(action);
};
