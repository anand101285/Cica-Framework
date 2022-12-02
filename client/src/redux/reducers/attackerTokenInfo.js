import * as types from '../constants';

const initialState = {
  ip: '',
  tokenInfo: undefined
};

const ATTACKERTOKENREDUCER = (state = initialState, action) => {
  const { type, payload } = action;
  if (type) {
    switch (type) {
      case types.GET_ATTACKER_TOKENS:
        return {
          ...state,
          ip: payload.ip,
          tokenInfo: payload.data
        };
      default:
        return {
          ...state
        };
    }
  }
  return state;
};

export { ATTACKERTOKENREDUCER };
