import * as types from '../constants';

const initialState = {
  ipDataLoading: true,
  allIps: [],
  ipProfile: {}
};

const IPPROFILINGREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_ALL_IPS_SUCCESS:
        return {
          ...state,
          allIps: action.payload,
          ipDataLoading: false
        };
      case types.GET_ALL_IPS_FAILURE:
        return {
          ...initialState,
          ipDataLoading: false
        };
      case types.GET_IP_PROFILING_SUCCESS:
        return {
          ...state,
          ipProfile: action.payload.binary_details
        };
      case types.GET_IP_PROFILING_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { IPPROFILINGREDUCER };
