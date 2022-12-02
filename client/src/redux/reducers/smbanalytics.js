import * as types from '../constants';

const initialState = {
  smb_data: [],
  smb_timestamps: [],
  smb_reports: []
};
// TODO Recheck this reducer
const SMBANALYTICSREDUCER = (state = initialState, action) => {
  if (action) {
    switch (action.type) {
      case types.GET_SMB_DATA_SUCCESS:
        return {
          ...state,
          smb_data: action.payload
        };
      case types.GET_SMB_DATA_FAILURE:
        return {
          ...initialState
        };
      case types.GET_SMB_TIMESTAMPS_SUCCESS:
        return {
          ...state,
          smb_timestamps: action.payload
        };
      case types.GET_SMB_TIMESTAMPS_FAILURE:
        return {
          ...initialState
        };
      case types.GET_SMB_REPORTS_SUCCESS:
        return {
          ...state,
          smb_reports: action.payload
        };
      case types.GET_SMB_REPORTS_FAILURE:
        return {
          ...initialState
        };
      default:
        return state;
    }
  }
  return state;
};
export { SMBANALYTICSREDUCER };
