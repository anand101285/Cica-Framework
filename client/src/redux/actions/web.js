import * as types from '../constants';
import { api } from '../../services/api';

export const GET_WEB_DATA = () => {
  const action = {
    url: '/elasticsearch/web/attackerIp',
    types: [types.GET_WEB_DATA_SUCCESS, types.GET_WEB_DATA_FAILURE]
  };
  return api.get(action);
};

export const GET_WEB_TIMESTAMP = () => {
  const action = {
    url: '/elasticsearch/web/timestamp',
    types: [types.GET_WEB_TIMESTAMP_SUCCESS, types.GET_WEB_TIMESTAMP_FAILURE]
  };
  return api.get(action);
};
