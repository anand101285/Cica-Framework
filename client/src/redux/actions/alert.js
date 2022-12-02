import * as types from '../constants';

export const ADD_ALERT = (message, type) => ({
  type: types.GET_ALERT,
  payload: { data: { message, type } }
});

export const CLEAR_ALERT = () => ({ type: types.REMOVE_ALERT });
