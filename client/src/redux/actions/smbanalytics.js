import * as types from '../constants';
import { api } from '../../services/api';

export const GET_SMB_DATA = () => {
  const action = {
    url: `/elasticsearch/smb/country/`,
    types: [types.GET_SMB_DATA_SUCCESS, types.GET_SMB_DATA_FAILURE]
  };
  return api.get(action);
};

export const GET_SMB_TIMESTAMPS = () => {
  const action = {
    url: `/elasticsearch/smb/timestamp/`,
    types: [types.GET_SMB_TIMESTAMPS_SUCCESS, types.GET_SMB_TIMESTAMPS_FAILURE]
  };
  return api.get(action);
};

export const GET_SMB_REPORTS = () => {
  const action = {
    url: `/elasticsearch/dionaea_reports/topSeverity_binaries/10/`,
    types: [types.GET_SMB_REPORTS_SUCCESS, types.GET_SMB_REPORTS_FAILURE]
  };
  return api.get(action);
};
