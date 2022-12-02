import * as types from '../constants';
import { api } from '../../services/api';

export const GET_DASHBOARD_DIONAEA_COUNT = () => {
  const action = {
    url: `/elasticsearch/dionaea/all_interaction/count/`,
    types: [types.GET_DASHBOARD_DIONAEA_COUNT_SUCCESS, types.GET_DASHBOARD_DIONAEA_COUNT_FAILURE]
  };
  return api.get(action);
};

export const GET_DASHBOARD_WEB_COUNT = () => {
  const action = {
    url: `/elasticsearch/web/all_interaction/count/`,
    types: [types.GET_DASHBOARD_WEB_COUNT_SUCCESS, types.GET_DASHBOARD_WEB_COUNT_FAILURE]
  };
  return api.get(action);
};

export const GET_DASHBOARD_IPTABLE_COUNT = () => {
  const action = {
    url: `/elasticsearch/iptable/all_interaction/count/`,
    types: [types.GET_DASHBOARD_IPTABLE_COUNT_SUCCESS, types.GET_DASHBOARD_IPTABLE_COUNT_SUCCESS]
  };
  return api.get(action);
};

export const GET_DASHBOARD_TOKEN_SUMMARY = () => {
  const action = {
    url: `/database/tokens/summary/`,
    types: [types.GET_DASHBOARD_TOKEN_SUMMARY_SUCCESS, types.GET_DASHBOARD_TOKEN_SUMMARY_FAILURE]
  };
  return api.get(action);
};

export const GET_DASHBOARD_COMPROMISED_BEACONS = () => {
  const action = {
    url: `/database/token/generated/`,
    types: [
      types.GET_DASHBOARD_COMPROMISED_BEACONS_SUCCESS,
      types.GET_DASHBOARD_COMPROMISED_BEACONS_FAILURE
    ]
  };
  return api.get(action);
};

export const GET_DASHBOARD_COUNTRY_INTERACTIONS = () => {
  const action = {
    url: `/elasticsearch/iptable/all_country_interaction/count/`,
    types: [
      types.GET_DASHBOARD_COUNTRY_INTERACTIONS_SUCCESS,
      types.GET_DASHBOARD_COUNTRY_INTERACTIONS_FAILURE
    ]
  };
  return api.get(action);
};

export const GET_BEACONS_GENERATED = () => {
  const action = {
    url: `/database/tokens/summary/`,
    types: [types.GET_BEACONS_DATA_SUCCESS, types.GET_BEACONS_DATA_FAILURE]
  };
  return api.get(action);
};
