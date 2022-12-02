import * as types from '../constants';
import { api } from '../../services/api';

export const GET_IPS = () => {
  const action = {
    url: '/elasticsearch/dionaea/all_interaction_ip',
    types: [types.GET_ALL_IPS_SUCCESS, types.GET_ALL_IPS_FAILURE]
  };
  return api.get(action);
};

export const GET_IP_PROFILING = (ip) => {
  const action = {
    url: `/elasticsearch/dionaea/all_hashes/${ip}`,
    types: [types.GET_IP_PROFILING_SUCCESS, types.GET_IP_PROFILING_FAILURE]
  };
  return api.get(action);
};
