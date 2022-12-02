import * as types from '../constants';
import { api } from '../../services/api';

export const USER_LOGIN = (user) => {
  const action = {
    url: '/auth',
    types: [types.USER_LOGIN_SUCCESS, types.USER_LOGIN_FAILURE]
  };
  const params = JSON.stringify({
    email: user.email,
    password: user.password
  });
  return api.post(action, params, 'login');
};

export const USER_LOGOUT = () => {
  localStorage.removeItem('userData');
  return { type: types.USER_LOGOUT };
};

export const USER_REGISTER = (user) => {
  const action = {
    url: '/users/',
    types: [types.USER_REGISTER_SUCCESS, types.USER_REGISTER_FAILURE]
  };
  const params = JSON.stringify({
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    password: user.password
  });
  return api.post(action, params, 'register');
};
