import axios from 'axios';
import { APP_URL } from '../config';
import { ADD_ALERT } from '../redux/actions/alert';
const userData = JSON.parse(localStorage.getItem('userData'));
const instance = axios.create({
  baseURL: APP_URL,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    authorization: userData?.user?.userId
  }
});

const USER_SESSION = (user, token) => {
  // const tokenExpirationDate = new Date(new Date().getTime() + 1000);
  localStorage.setItem(
    'userData',
    JSON.stringify({
      user,
      token
      // expiration: tokenExpirationDate.toISOString()
    })
  );
};

const api = {
  get: (options) => async (dispatch) => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) =>
      instance
        .get(options.url)
        .then((res) => {
          resolve(
            dispatch({
              type: success,
              payload: res.data
            })
          );
        })
        .catch((err) => {
          reject(
            dispatch({
              type: failure,
              payload: err
            })
          );
        });

    return new Promise(promise);
  },
  post:
    (options, params = null, type = null) =>
    async (dispatch) => {
      const [success, failure] = options.types;
      const promise = (resolve, reject) => {
        instance
          .post(options.url, params)
          .then((res) => {
            resolve(
              dispatch({
                type: success,
                payload: res.data
              }),
              dispatch(ADD_ALERT('Logged In Successfully', 'success'))
            );
            if (type === 'login' || type === 'register') {
              USER_SESSION(res.data.user, res.data.token);
            }
          })
          .catch((err) => {
            reject(
              dispatch({
                type: failure,
                payload: err
              }),
              dispatch(ADD_ALERT('Incorrect Username or Password!', 'error'))
            );
          });
      };
      return new Promise(promise);
    }
};

export { api };
