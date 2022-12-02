import axios from 'axios';
import FileDownload from 'js-file-download';
import * as types from '../constants';
import { APP_URL } from '../../config';
import { ADD_ALERT } from './alert';

export const GET_NEW_BEACON_FILE =
  (userId, filename, filetype, download = true, techniqueId) =>
  (dispatch) => {
    axios({
      url: `${APP_URL}/honeytoken/${filetype}`,
      method: 'POST',
      responseType: download ? 'blob' : '', // important
      data: JSON.stringify({ sessionid: userId, techniqueId })
    })
      .then((res) => {
        switch (filetype) {
          case 'word':
            FileDownload(res.data, `${filename}.docx`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'worddoc':
            FileDownload(res.data, `${filename}.doc`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'excel_vba':
            FileDownload(res.data, `${filename}.xlsm`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'excel':
            FileDownload(res.data, `${filename}.xlsx`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'linux_bashrc':
            FileDownload(res.data, `${filename}.sh`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'mysql_master':
            FileDownload(res.data, `${filename}.sql`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'aws_keys':
            FileDownload(res.data, `${filename}.txt`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'kubeconfig':
            FileDownload(res.data, `${filename}.txt`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'web_gif':
            dispatch({ type: types.GET_NEW_BEACON_URL_SUCCESS, payload: res });
            break;
          case 'content_without_source':
            dispatch({ type: types.GET_NEW_BEACON_URL_SUCCESS, payload: res });
            break;
          case 'hostFile':
            FileDownload(res.data, `${filename}.txt`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'dnsToken':
            dispatch({ type: types.GET_NEW_BEACON_URL_SUCCESS, payload: res });
            break;
          case 'registry_process':
            FileDownload(res.data, `${filename}.reg.txt`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'windows_batch':
            FileDownload(res.data, `${filename}.bat`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          case 'fakeApi':
            FileDownload(res.data, `${filename}.json`);
            dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
            break;
          default:
            break;
        }
        dispatch(ADD_ALERT('Token Generated', 'success'));
        return true;
      })
      .catch((error) => {
        dispatch({ type: types.GET_NEW_BEACON_FILE_FAILURE, payload: error.toString() });
        dispatch(ADD_ALERT(error, 'danger'));
        return false;
      });
  };

export const DOWNLOAD_AGENT = () => (dispatch) => {
  axios({
    url: `${APP_URL}/honeypot/download_agent`,
    method: 'GET',
    responseType: 'blob'
  }).then((res) => {
    FileDownload(res.data, `agent.py`);
    dispatch({ type: types.GET_NEW_BEACON_FILE_SUCCESS, payload: 'Success' });
  });
};
