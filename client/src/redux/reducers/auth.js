import * as types from '../constants';

const UserData = JSON.parse(localStorage.getItem('userData'));
const initialState = UserData ? { loggedIn: true, user: UserData.user } : {};

export const AUTHREDUCER = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.user
      };
    case types.USER_LOGIN_FAILURE:
      return { ...initialState };
    case types.USER_LOGOUT:
      return { ...initialState };
    case types.USER_REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.user
      };
    case types.USER_REGISTER_FAILURE:
      return { ...initialState };
    default:
      return state;
  }
};
