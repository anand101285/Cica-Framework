import * as types from '../constants';

const initialState = {
  file: '',
  url: ''
};

const NEWBEACONREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_NEW_BEACON_FILE_SUCCESS:
        return {
          ...state,
          file: action.payload,
          url: ''
        };
      case types.GET_NEW_BEACON_FILE_FAILURE:
        return {
          ...initialState
        };
      case types.GET_NEW_BEACON_URL_SUCCESS:
        return {
          ...state,
          url: action.payload.data.url,
          file: ''
        };
      default:
        return state;
    }
  }
  return state;
};
export { NEWBEACONREDUCER };
