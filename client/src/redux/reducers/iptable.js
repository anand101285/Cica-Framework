import * as types from '../constants';

const initialState = {
  interactions: [],
  scans: []
};

const IPTABLEREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_IP_TABLE_INTERACTIONS_SUCCESS:
        return {
          ...state,
          interactions: action.payload
        };
      case types.GET_IP_TABLE_INTERACTIONS_FAILURE:
        return {
          ...initialState
        };
      case types.GET_IP_TABLE_SCANS_SUCCESS:
        return {
          ...state,
          scans: action.payload.binary_details
        };
      case types.GET_IP_TABLE_SCANS_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { IPTABLEREDUCER };
