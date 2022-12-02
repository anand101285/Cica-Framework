import * as types from '../constants';

const initialState = {
  attackerdata: []
};

const MAPREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_ATTACKER_LOCATION_SUCCESS:
        return {
          ...state,
          attackerdata: action.payload
        };
      case types.GET_ATTACKER_LOCATION_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { MAPREDUCER };
