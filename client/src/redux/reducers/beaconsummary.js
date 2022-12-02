import * as types from '../constants';

const initialState = {
  beacon_summary: []
};

const BEACONSUMMARYREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_BEACON_SUMMARY_DATA_SUCCESS:
        return {
          ...state,
          beacon_summary: action.payload
        };
      case types.GET_BEACON_SUMMARY_DATA_FAILURE:
        return {
          ...initialState
        };
      default:
        return { ...state };
    }
  }
  return state;
};
export { BEACONSUMMARYREDUCER };
