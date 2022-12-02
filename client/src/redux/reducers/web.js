import * as types from '../constants';

const initialState = {
  web: [],
  web_timestamp: []
};

const WEBREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_WEB_DATA_SUCCESS:
        return {
          ...state,
          web: action.payload
        };
      case types.GET_WEB_DATA_FAILURE:
        return {
          ...initialState
        };
      case types.GET_WEB_TIMESTAMP_SUCCESS:
        return {
          ...state,
          web_timestamp: action.payload
        };
      case types.GET_WEB_TIMESTAMP_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { WEBREDUCER };
