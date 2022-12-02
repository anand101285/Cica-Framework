import * as types from '../constants';

const initialState = {
  machine_details: []
};

const HONEYPOTREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_DASHBOARD_HONEYPOT_MACHINE_DATA_SUCCESS:
        return {
          ...state,
          machine_details: action.payload
        };
      case types.GET_DASHBOARD_HONEYPOT_MACHINE_DATA_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { HONEYPOTREDUCER };
