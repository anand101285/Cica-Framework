import * as types from '../constants';

const initialState = {
  open: false,
  type: 'info',
  message: '',
  timeout: 5000
};

const ALERTSREDUCER = (state = initialState, action) => {
  const { type, payload } = action;
  if (type) {
    switch (type) {
      case types.GET_ALERT:
        return {
          ...state,
          open: true,
          message: payload.data.message,
          type: payload.data.type
        };
      case types.REMOVE_ALERT:
        return {
          ...initialState,
          open: false
        };
      default:
        return state;
    }
  }
  return state;
};
export { ALERTSREDUCER };
