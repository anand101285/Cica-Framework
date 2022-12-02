import * as types from '../constants';
import { api } from '../../services/api';

export const GET_MITRE_NAVIGATOR = () => {
  const action = {
    url: '/mitre/fetchMitreNavigator',
    types: [types.GET_MITRE_NAVIGATOR_SUCCESS, types.GET_MITRE_NAVIGATOR_FAILURE]
  };
  return api.get(action);
};

export const GET_ATTACK_PATHS = () => {
  const action = {
    url: 'database/all-attacker/get-all-tokens',
    types: [types.GET_ATTACK_PATHS_SUCCESS, types.GET_ATTACK_PATHS_FAILURE]
  };
  return api.get(action);
};

export const GET_FILTERED_ATTACK_PATHS = (payload) => (dispatch) => {
  dispatch({ type: types.GET_FILTERED_ATTACK_PATHS_SUCCESS, payload });
};
