const env = process.env.REACT_APP_ENVIRONMENT;
const url =
  env === 'production'
    ? 'https://counterintelligenceframework.herokuapp.com'
    : 'http://localhost:5000';

export const APP_URL = url;
