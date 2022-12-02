import * as types from '../constants';

const initialState = {
  dionaea_count: -1,
  web_count: -1,
  iptable_count: -1,
  compromised_beacons: -1,
  token_summary: {},
  country_interactions: [],
  beacons: {}
};
const DASHBOARDREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_DASHBOARD_DIONAEA_COUNT_SUCCESS:
        return {
          ...state,
          dionaea_count: action.payload.count
        };
      case types.GET_DASHBOARD_DIONAEA_COUNT_FAILURE:
        return {
          ...state
        };
      case types.GET_DASHBOARD_WEB_COUNT_SUCCESS:
        return {
          ...state,
          web_count: action.payload.count
        };
      case types.GET_DASHBOARD_WEB_COUNT_FAILURE:
        return {
          ...state
        };
      case types.GET_DASHBOARD_IPTABLE_COUNT_SUCCESS:
        return {
          ...state,
          iptable_count: action.payload.count
        };
      case types.GET_DASHBOARD_IPTABLE_COUNT_FAILURE:
        return {
          ...state
        };
      case types.GET_DASHBOARD_TOKEN_SUMMARY_SUCCESS:
        return {
          ...state,
          token_summary: action.payload
        };
      case types.GET_DASHBOARD_TOKEN_SUMMARY_FAILURE:
        return {
          ...state
        };
      case types.GET_DASHBOARD_COMPROMISED_BEACONS_SUCCESS:
        return {
          ...state,
          compromised_beacons: action.payload[0]
        };
      case types.GET_DASHBOARD_COMPROMISED_BEACONS_FAILURE:
        return {
          ...state
        };
      case types.GET_DASHBOARD_COUNTRY_INTERACTIONS_SUCCESS:
        return {
          ...state,
          country_interactions: action.payload.data
        };
      case types.GET_DASHBOARD_COUNTRY_INTERACTIONS_FAILURE:
        return {
          ...state
        };
      case types.GET_BEACONS_DATA_SUCCESS:
        return {
          ...state,
          beacons: action.payload
        };
      case types.GET_BEACONS_DATA_FAILURE:
        return {
          ...state
        };
      default:
        return state;
    }
  }
  return state;
};
export { DASHBOARDREDUCER };
