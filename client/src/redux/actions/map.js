import * as types from '../constants';
import { api } from '../../services/api';

export const GET_ATTACKER_LOCATION = (userId) => {
  const action = {
    url: `/database/token/getcompromisedlocation/${userId}`,
    types: [types.GET_ATTACKER_LOCATION_SUCCESS, types.GET_ATTACKER_LOCATION_FAILURE]
  };
  return api.get(action);
};
