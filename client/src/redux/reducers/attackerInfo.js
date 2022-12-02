import * as types from '../constants';

const initialState = {
  ip: '',
  nmapDetails: [],
  intelData: {},
  scanLoading: false,
  intelLoading: false
};

const ATTACKERINFOREDUCER = (state = initialState, action) => {
  const { type, payload } = action;
  if (type) {
    switch (type) {
      case types.GET_IP_NMAP_DETAILS:
        return {
          ...state,
          ip: payload.ip,
          nmapDetails: payload.data,
          scanLoading: false
        };
      case types.GET_INTEL_DETAILS:
        return {
          ...state,
          intelData: payload.data,
          intelLoading: false
        };
      case types.START_NMAP_SCAN:
        return {
          ...state,
          scanLoading: true
        };
      case types.STOP_NMAP_SCAN:
        return {
          ...state,
          scanLoading: false
        };
      case types.START_INTEL_GATHERING:
        return {
          ...state,
          intelLoading: true
        };
      case types.STOP_INTEL_GATHERING:
        return {
          ...state,
          intelData: {},
          intelLoading: false
        };
      case types.CLEAR_MEMORY:
        return {
          ...state,
          ip: '',
          nmapDetails: [],
          intelData: {},
          scanLoading: false,
          intelLoading: false
        };
      default:
        return state;
    }
  }
  return state;
};

export { ATTACKERINFOREDUCER };
